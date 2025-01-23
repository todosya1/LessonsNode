const http = require('http'); // Импорт модуля HTTP
const fs = require('fs'); // Импорт модуля для работы с файлами
const path = require('path'); // Импорт модуля для работы с путями

// Путь к папке templates
const dirPath = path.join(__dirname, '/templates');

// Чтение файла page.html
const fileToSend = fs.readFileSync(`${dirPath}/page.html`);

// Создание сервера
const server = http.createServer((req, res) => {
    // Логирование входящих запросов
    console.log(req);

    // Установка заголовка ответа
    res.setHeader('Content-Type', 'text/html');

    // Отправка HTML-файла клиенту
    res.end(fileToSend);
});

// Сервер начинает слушать на порту 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
