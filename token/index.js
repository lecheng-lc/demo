require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// 模拟数据库存储 refreshToken
const refreshTokensDB = new Map();

// 生成 accessToken
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 分钟
      issuer: "auth.example.com",
      deviceId: user.deviceId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

// 生成 refreshToken
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // 7 天
  );

  refreshTokensDB.set(user.id, refreshToken);
  return refreshToken;
}

// 用户登录
app.post("/login", (req, res) => {
  const { username, password, deviceId } = req.body;
  // 模拟用户认证
  if (username !== "admin" || password !== "password") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = { id: "12345", role: "admin", deviceId };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken, expiresIn: 15 * 60 });
});

// 受保护接口
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});

// Token 验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 自动刷新 accessToken
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err || !refreshTokensDB.has(user.userId)) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken, expiresIn: 15 * 60 });
  });
});

// 退出登录
app.post("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  refreshTokensDB.delete(refreshToken);
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

app.listen(3000, () => console.log("Server running on port 3000"));