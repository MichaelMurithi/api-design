const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.write('Hello nodejs API designer!');
        res.end();
    }
});

server.listen(3001, () => {
    console.log('Server listening on http://localhost:3001');
});