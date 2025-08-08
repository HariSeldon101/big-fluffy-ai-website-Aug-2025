const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'out', req.url === '/' ? 'index.html' : req.url);
  
  // Get the file extension
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (ext) {
    case '.css': contentType = 'text/css'; break;
    case '.js': contentType = 'text/javascript'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpeg'; break;
    case '.woff2': contentType = 'font/woff2'; break;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(8080, 'localhost', () => {
  console.log('Server running at http://localhost:8080');
});