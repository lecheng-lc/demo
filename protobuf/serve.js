const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/") {
    const chunks = [];
    let totalLength = 0;

    req.on("data", (chunk) => {
      totalLength += chunk.length;

      if (totalLength > 2 * 1024 * 1024) {
        res.writeHead(413, { "Content-Type": "text/plain" });
        res.end("Payload Too Large");
        req.destroy();
        return;
      }

      chunks.push(chunk);
    });

    req.on("end", () => {
      const body = Buffer.concat(chunks);

      console.log("Received:", body);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Length": body.length,
      });

      // 原样返回
      res.end(body);
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(400);
      res.end();
    });

    return;
  }

  // 其他路由
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
