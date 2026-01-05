// test_protobuf.js
const protobuf = require('protobufjs');
const fs = require('fs');
const zlib = require('zlib');

// 1. 定义原始 JSON 数据
const jsonData = {
    event_id: "page_view",
    timestamp: 1700000000000,
    properties: {
        page: "home",
        user_type: "vip",
        product_id: "sku_123456",
        category: "electronics",
        price: "99.99"
    },
    user_id: "u_abc123xyz",
    session_id: "sess_098765"
};

console.log('========== 数据对比测试 ==========\n');

// 2. 计算 JSON 大小
const jsonString = JSON.stringify(jsonData);
const jsonSize = Buffer.byteLength(jsonString);
console.log('1. JSON 格式大小:');
console.log(`   - 示例: ${jsonString.substring(0, 80)}...`);
console.log(`   - 字节数: ${jsonSize} bytes\n`);

// 3. 加载并编译 .proto 文件
const root = protobuf.loadSync('tracking.proto');
const TrackingEvent = root.lookupType('tracking.TrackingEvent');

// 4. 验证数据
const errMsg = TrackingEvent.verify(jsonData);
if (errMsg) {
    throw new Error(errMsg);
}

// 5. 创建 Protobuf 消息并编码
const message = TrackingEvent.create(jsonData);
const protoBuffer = TrackingEvent.encode(message).finish();
const protoSize = protoBuffer.length;
console.log('2. Protobuf 格式大小:');
console.log(`   - 二进制 Buffer: ${Array.from(protoBuffer.slice(0, 15)).map(b => b.toString(16).padStart(2, '0')).join(' ')}...`);
console.log(`   - 字节数: ${protoSize} bytes\n`);

// 6. 大小对比
const reduction = ((jsonSize - protoSize) / jsonSize * 100).toFixed(1);
console.log('3. 大小对比结果:');
console.log(`   - Protobuf 比 JSON 小 ${reduction}%`);
console.log(`   - 体积减少 ${jsonSize - protoSize} bytes\n`);

// 7. 模拟解析性能对比（循环10,000次）
console.log('4. 模拟解析性能测试（循环10,000次）:');

// JSON 解析计时
console.time('JSON解析耗时');
for (let i = 0; i < 10000; i++) {
    const parsed = JSON.parse(jsonString);
}
console.timeEnd('JSON解析耗时');

// Protobuf 解码计时
console.time('Protobuf解码耗时');
for (let i = 0; i < 10000; i++) {
    const decoded = TrackingEvent.decode(protoBuffer);
}
console.timeEnd('Protobuf解码耗时');

// 8. 解码演示
console.log('5. Protobuf 解码演示:');
const decodedMessage = TrackingEvent.decode(protoBuffer);
const decodedObject = TrackingEvent.toObject(decodedMessage, {
    longs: String,
    defaults: true
});
console.log('   解码后对象结构:');
console.log(JSON.stringify(decodedObject, null, 2));
console.log('');

// 9. Gzip压缩后大小对比
console.log('6. 模拟传输压缩(Gzip)后大小:');
const jsonGzipped = zlib.gzipSync(jsonString);
const protoGzipped = zlib.gzipSync(protoBuffer);
console.log(`   - JSON + Gzip: ${jsonGzipped.length} bytes`);
console.log(`   - Protobuf + Gzip: ${protoGzipped.length} bytes`);
const gzipReduction = ((jsonGzipped.length - protoGzipped.length) / jsonGzipped.length * 100).toFixed(1);
console.log(`   - 压缩后 Protobuf 仍小 ${gzipReduction}%`);
console.log('');

// 10. 生成模拟GET请求的Base64字符串
console.log('7. 模拟生成GET请求的Base64字符串(类似阿里云Web Tracking):');
const compressedForTransport = zlib.gzipSync(protoBuffer);
const base64String = compressedForTransport.toString('base64');
console.log(`   - Base64字符串长度: ${base64String.length} 字符`);
console.log(`   - 前120字符示例: ${base64String.substring(0, 120)}...`);
console.log('');

// 11. 反向验证：Base64解码->解压->Protobuf解码
console.log('8. 反向验证(Base64->解压->解码):');
try {
    const decodedFromBase64 = Buffer.from(base64String, 'base64');
    const decompressed = zlib.gunzipSync(decodedFromBase64);
    const finalDecoded = TrackingEvent.decode(decompressed);
    console.log('   ✅ 反向解码成功！事件ID:', TrackingEvent.toObject(finalDecoded).event_id);
} catch (error) {
    console.log('   ❌ 反向解码失败:', error.message);
}

// 12. 额外测试：创建多个事件的日志组
console.log('\n9. 额外测试：多个事件的日志组(TrackingEventGroup):');
const eventGroup = {
    events: [jsonData, jsonData, jsonData] // 3个相同事件
};
const TrackingEventGroup = root.lookupType('tracking.TrackingEventGroup');
const groupMessage = TrackingEventGroup.create(eventGroup);
const groupBuffer = TrackingEventGroup.encode(groupMessage).finish();
console.log(`   - 3个事件的日志组大小: ${groupBuffer.length} bytes`);
console.log(`   - 平均每个事件: ${(groupBuffer.length / 3).toFixed(1)} bytes`);