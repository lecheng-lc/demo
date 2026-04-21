const http = require("http");
const https = require("https");
const { URL } = require("url");

const PORT = 8089;
const API_TARGET_HOST = "10.171.211.77";
const API_TARGET_PORT = 3000;
let lastTargetOrigin = null;
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]);

const removeCspHeaders = (headers) => {
  const next = { ...headers };
  delete next["content-security-policy"];
  delete next["content-security-policy-report-only"];
  return next;
};

const parseCookies = (cookieHeader) => {
  const out = {};
  const raw = String(cookieHeader || "");
  if (!raw) return out;
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!key) continue;
    out[key] = value;
  }
  return out;
};

const appendSetCookie = (headers, cookie) => {
  const existing = headers["set-cookie"];
  if (!existing) {
    headers["set-cookie"] = [cookie];
    return;
  }
  if (Array.isArray(existing)) {
    headers["set-cookie"] = [...existing, cookie];
    return;
  }
  headers["set-cookie"] = [existing, cookie];
};

const filterRequestHeaders = (headers) => {
  const next = {};
  for (const [key, value] of Object.entries(headers || {})) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower) || lower === "host") continue;
    next[key] = value;
  }
  return next;
};

const filterResponseHeaders = (headers) => {
  const next = {};
  for (const [key, value] of Object.entries(headers || {})) {
    if (HOP_BY_HOP_HEADERS.has(String(key).toLowerCase())) continue;
    next[key] = value;
  }
  return next;
};

const getTargetBaseFromReferer = (referer, port) => {
  if (!referer) return null;
  try {
    const refUrl = new URL(referer);
    if (refUrl.hostname !== "localhost") return null;
    if (String(refUrl.port || (refUrl.protocol === "https:" ? 443 : 80)) !== String(port)) return null;
    return parseTargetUrl(refUrl.pathname);
  } catch {
    return null;
  }
};

const rewriteLocationHeader = (location, currentTargetBase, port) => {
  if (!location || !currentTargetBase) return location;
  try {
    const absolute = new URL(location, currentTargetBase.origin);
    if (absolute.origin !== currentTargetBase.origin) return location;
    return `http://localhost:${port}/${absolute.href}`;
  } catch {
    return location;
  }
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
};

const forwardToSaveServer = (clientReq, clientRes) => {
  const options = {
    hostname: API_TARGET_HOST,
    port: API_TARGET_PORT,
    path: "/save-data",
    method: "POST",
    headers: {
      ...filterRequestHeaders(clientReq.headers),
      host: `${API_TARGET_HOST}:${API_TARGET_PORT}`,
    },
  };

  const upstreamReq = http.request(options, (upstreamRes) => {
    const headers = filterResponseHeaders(upstreamRes.headers);
    clientRes.writeHead(upstreamRes.statusCode || 500, headers);
    upstreamRes.pipe(clientRes);
  });

  upstreamReq.on("error", (error) => {
    sendJson(clientRes, 502, { error: `save-data upstream error: ${error.message}` });
  });

  clientReq.pipe(upstreamReq);
};

const parseTargetUrl = (urlPath) => {
  const raw = String(urlPath || "/").replace(/^\/+/, "");
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
};

const proxyWebPage = (clientReq, clientRes, targetUrl) => {
  lastTargetOrigin = targetUrl.origin;
  const requester = targetUrl.protocol === "https:" ? https : http;
  const options = {
    protocol: targetUrl.protocol,
    hostname: targetUrl.hostname,
    port: targetUrl.port || (targetUrl.protocol === "https:" ? 443 : 80),
    method: clientReq.method,
    path: `${targetUrl.pathname}${targetUrl.search}`,
    headers: {
      ...filterRequestHeaders(clientReq.headers),
      host: targetUrl.host,
    },
  };

  const upstreamReq = requester.request(options, (upstreamRes) => {
    const stripped = removeCspHeaders(upstreamRes.headers);
    const headers = filterResponseHeaders(stripped);
    if (headers.location) {
      const targetBase = new URL(targetUrl.origin);
      headers.location = rewriteLocationHeader(headers.location, targetBase, PORT);
    }
    appendSetCookie(
      headers,
      `proxy_target=${encodeURIComponent(targetUrl.origin)}; Path=/; SameSite=Lax`,
    );
    headers["access-control-allow-origin"] = "*";
    clientRes.writeHead(upstreamRes.statusCode || 500, headers);
    upstreamRes.pipe(clientRes);
  });

  upstreamReq.on("error", (error) => {
    sendJson(clientRes, 502, { error: `proxy upstream error: ${error.message}` });
  });

  clientReq.pipe(upstreamReq);
};

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  if (req.url === "/") {
    sendJson(res, 200, {
      usage: [
        "打开目标网页: http://localhost:8089/https://example.com/path?query=1",
        "页面内上报接口: POST /save-data (会转发到 10.171.211.77:3000/save-data)",
      ],
    });
    return;
  }

  if (req.url === "/save-data" && req.method === "POST") {
    forwardToSaveServer(req, res);
    return;
  }

  let targetUrl = parseTargetUrl(req.url);
  if (!targetUrl) {
    const base = getTargetBaseFromReferer(req.headers.referer, PORT);
    if (base) {
      try {
        targetUrl = new URL(req.url, base.origin);
      } catch {
        targetUrl = null;
      }
    }
  }

  if (!targetUrl) {
    const cookies = parseCookies(req.headers.cookie);
    if (cookies.proxy_target) {
      try {
        const origin = decodeURIComponent(cookies.proxy_target);
        targetUrl = new URL(req.url, origin);
      } catch {
        targetUrl = null;
      }
    }
  }

  if (!targetUrl && lastTargetOrigin) {
    try {
      targetUrl = new URL(req.url, lastTargetOrigin);
    } catch {
      targetUrl = null;
    }
  }

  if (!targetUrl) {
    sendJson(res, 400, {
      error: "invalid target url. open page via /https://your-target-url first",
      hint: `example: http://localhost:${PORT}/https://example.com/path`,
    });
    return;
  }

  proxyWebPage(req, res, targetUrl);
});

server.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
  console.log("Open page via: http://localhost:8089/https://目标网址");
});
