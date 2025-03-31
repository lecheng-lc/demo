// 以下逻辑
// ✅ Redis 记录黑名单（封禁 IP 10 分钟）
// ✅ 自动解封（10 分钟后 IP 可重新访问）
// ✅ 邮件通知（管理员收到封禁通知）
const express = require("express");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const rateLimit = require("express-rate-limit");
const redis = require("redis");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// 连接 Redis
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

const AES_SECRET_KEY = "my_secret_32_byte_key_1234567890"; // 32字节密钥
const FAILED_LIMIT = 5; // 失败次数限制
const BAN_DURATION = 10 * 60; // 10 分钟自动解封（单位：秒）

// 邮件通知配置
const transporter = nodemailer.createTransport({
  service: "gmail", // 你的邮件服务商
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

// 限制 IP 请求频率
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 分钟
  max: 5, // 每分钟最多 5 次
  message: { error: "请求过于频繁，请稍后再试" },
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

async function isIPBlocked(ip) {
  return (await redisClient.exists(`blocked:${ip}`)) > 0;
}

async function blockIP(ip) {
  await redisClient.setEx(`blocked:${ip}`, BAN_DURATION, "true");
  await sendBlockNotification(ip);
}

async function unblockIP(ip) {
  await redisClient.del(`blocked:${ip}`);
}

async function sendBlockNotification(ip) {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "admin@example.com",
    subject: "⚠️ 服务器安全警报：IP 被封禁",
    text: `IP ${ip} 由于多次失败请求已被封禁！`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("邮件发送失败", error);
    else console.log("📧 邮件通知已发送:", info.response);
  });
}

function decryptAES(encryptedText, key) {
  console.log("解密前的数据:", encryptedText);
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  console.log("解密后的数据:", bytes.toString(CryptoJS.enc.Utf8));
  return bytes.toString(CryptoJS.enc.Utf8);
}

function generateSign(data, key, timestamp, nonce) {
  const str = JSON.stringify(data) + key + timestamp + nonce;
  return CryptoJS.MD5(str).toString();
}

app.post("/api/decrypt", async (req, res) => {
  const clientIP = req.ip;
  if (await isIPBlocked(clientIP)) {
    return res.status(403).json({ error: "此 IP 已被封禁，请 10 分钟后再试" });
  }

  try {
    const { key, data, timestamp, nonce, sign } = req.body;
    console.log(`[${clientIP}] 请求体111:`, req.body);
    const randomKey = decryptAES(key, AES_SECRET_KEY);
    console.log(`[${clientIP}] 解密后的 Random Key:`, randomKey);

    const decryptedData = JSON.parse(decryptAES(data, randomKey));
    console.log(`[${clientIP}] 解密后的数据:`, decryptedData);

    const serverSign = generateSign(decryptedData, randomKey, timestamp, nonce);
    if (serverSign !== sign) {
      console.warn(`[${clientIP}] 签名校验失败！`);

      const failedAttempts =
        parseInt(await redisClient.get(`failed:${clientIP}`)) || 0;
      await redisClient.set(`failed:${clientIP}`, failedAttempts + 1, "EX", 60);

      if (failedAttempts + 1 >= FAILED_LIMIT) {
        await blockIP(clientIP);
        return res.status(403).json({ error: "多次签名失败，IP 已被封禁" });
      }

      return res.status(403).json({ error: "签名校验失败" });
    }

    await redisClient.del(`failed:${clientIP}`);
    res.json({ success: true, decryptedData });
  } catch (error) {
    console.error(`[${clientIP}] 解密失败:`, error);
    res.status(500).json({ error: "解密失败" });
  }
});

app.listen(3000, () => {
  console.log("服务器运行在 http://localhost:3000");
});