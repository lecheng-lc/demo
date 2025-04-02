const crypto = require("crypto");
// 生成 2048 位 RSA 密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

// 生成 256 位 AES 密钥
const aesKey = crypto.randomBytes(32); // 256-bit key
const aesIv = crypto.randomBytes(16); // 16-byte IV
const data = "这是一段用于测试加密和解密性能的数据，包含多个字符。";

// 计算执行时间的函数
function measureTime(fn, label) {
  const start = process.hrtime.bigint();
  fn();
  const end = process.hrtime.bigint();
  console.log(`${label} 耗时: ${(end - start) / BigInt(1e6)} ms`);
}

// **RSA 加密 & 解密**
function rsaEncryptDecrypt() {
  // 加密
  const encryptedData = crypto.publicEncrypt(
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    Buffer.from(data, "utf8")
  );

  // 解密
  const decryptedData = crypto.privateDecrypt(
    { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
    encryptedData
  );

  console.log("RSA 解密结果:", decryptedData.toString("utf8"));
}

// **AES 加密 & 解密**
function aesEncryptDecrypt() {
  // AES 加密
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, aesIv);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");

  // AES 解密
  const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, aesIv);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");

  console.log("AES 解密结果:", decryptedData);
}

// **测试 RSA 和 AES 的性能**
measureTime(rsaEncryptDecrypt, "RSA 加密 & 解密");
measureTime(aesEncryptDecrypt, "AES 加密 & 解密");