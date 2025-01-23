// 1. Импортируем модуль http
const http = require('http');

// 2. Создаём HTTP-сервер
const server = http.createServer((req, res) => {
    // Отправляем ответ клиенту
    res.end('Hello, Node.js server!');
});

// 3. Сервер начинает прослушивать порт 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
