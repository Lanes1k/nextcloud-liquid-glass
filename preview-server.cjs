// Local-only preview server. Start: node preview-server.cjs
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const files = new Map([
  ['/', ['preview.html', 'text/html; charset=utf-8']],
  ['/preview.html', ['preview.html', 'text/html; charset=utf-8']],
  ['/nextcloud-liquid-glass.css', ['nextcloud-liquid-glass.css', 'text/css; charset=utf-8']],
  ['/README.ru.md', ['README.ru.md', 'text/plain; charset=utf-8']],
]);
http.createServer((request, response) => {
  const file = files.get(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!file) { response.writeHead(404); response.end(); return; }
  fs.readFile(path.join(__dirname, file[0]), (error, contents) => {
    if (error) { response.writeHead(500); response.end('Read error'); return; }
    response.writeHead(200, {'Content-Type':file[1], 'Cache-Control':'no-store'});
    response.end(contents);
  });
}).listen(8787, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:8787'));
