const http = require('http');

const server = http.createServer((req, res) => {
    // Устанавливаем статусный код и заголовки
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
    });

    // Отправляем ответ
    res.end('<h1>Hello, Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
