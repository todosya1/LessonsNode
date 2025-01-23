const http = require('http');

const server = http.createServer((req, res) => {
    // Устанавливаем заголовки с помощью setHeader
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Powered-By', 'Node.js');
    res.statusCode = 200;

    // Отправляем ответ
    res.end('<h1>Hello,ыы Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
