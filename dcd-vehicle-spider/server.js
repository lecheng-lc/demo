const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const sanitizeFilename = (name) =>
  String(name).replace(/[\\/:*?"<>|／]/g, "_").slice(0, 120);

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-data') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const firstKeyRaw = Object.keys(data)[0];
        
        if (!firstKeyRaw) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'No data keys found' }));
          return;
        }
        
        const filename = `${sanitizeFilename(firstKeyRaw)}.json`;
        const filepath = path.join(DATA_DIR, filename);
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // 保存数据到文件
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
        
        console.log(`Data saved to ${filename}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          filename: filename,
          message: `Data saved to ${filename}` 
        }));
        
      } catch (error) {
        console.error('Error processing data:', error);
        console.error('Raw body:', body);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to process data', message: error.message, raw: body }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://10.171.211.77:${PORT}`);
  console.log(`Data will be saved to: ${DATA_DIR}`);
});

module.exports = server;
