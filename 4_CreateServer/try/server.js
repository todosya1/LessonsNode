// Пример создания сервера с заголовками и телом:
const http = require('http');

const server = http.createServer((req, res) => {
    // Установка заголовков
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Connection': 'keep-alive',
    });

    // Отправка тела ответа
    res.end('<html><head></head><body><h1>Hello, Node.js!</h1></body></html>');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
