// 2. Код с отправкой HTML-страницы
// Этот код создает HTTP-сервер, который отправляет HTML-страницу клиенту.
const http = require('http'); // Импорт модуля http

const server = http.createServer((req, res) => {
    // Устанавливаем заголовок ответа
    res.setHeader('Content-Type', 'text/html');

    // Отправляем HTML-контент
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Heading</h1>
        </body>
        </html>
    `);

    // Завершаем ответ
    res.end('Hello from the server!');
});

// Сервер начинает слушать на порту 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
