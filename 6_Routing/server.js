const http = require('http'); // Импорт модуля HTTP

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
    // Получаем URL и метод запроса
    const { url, method } = req;

    // Обработка маршрутов
    if (url === '/') {
        // Главная страница
        res.writeHead(200, { 'Content-Type': 'text/plain' }); // Устанавливаем заголовок ответа
        res.end('Welcome to the Home Page'); // Отправляем ответ
    } else if (url === '/about') {
        // Страница "О нас"
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Us Page');
    } else if (url === '/contact') {
        // Страница "Контакты"
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact Page');
    } else {
        // Обработка неизвестных маршрутов
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }
});

// Запуск сервера на порту 3000
server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
});
