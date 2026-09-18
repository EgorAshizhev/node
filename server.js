const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '127.0.0.1';
const PORT = 3003;

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}`);
  const params = url.searchParams;
  const paramNames = [...params.keys()];

  // No params at all -> "Hello, World!"
  if (paramNames.length === 0) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello, World!');
    return;
  }

  // ?hello=<name>
  if (params.has('hello')) {
    const name = params.get('hello');

    if (!name) {
      // hello present but no value
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Enter a name');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Hello, ${name}.`);
    return;
  }

  // ?users
  if (params.has('users')) {
    fs.readFile(USERS_FILE, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end();
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Any other parameters -> empty response, code 500
  res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end();
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
