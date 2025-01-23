const http = require('http'); // Импорт HTTP модуля
const fs = require('fs'); // Импорт модуля для работы с файлами

// Чтение HTML-файла как строки
let html = fs.readFileSync(__dirname + '/templates/page.html', 'utf8');
const heading = 'HTML File as Response'; // Новый заголовок для замены
html = html.replace('<h1-heading>', heading); // Замена текста в шаблоне

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
    // Установка заголовка ответа
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Отправка HTML-файла клиенту
    res.end(html);
});

// Сервер слушает порт 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
