// Импортируем базовые модули Node.js
const http = require('http');
const { readFileSync } = require('fs');

// Загружаем все файлы из папки navbar-app
// Делаем это один раз при запуске сервера для лучшей производительности
const homePage = readFileSync('./navbar-app/index.html');    // Главная страница с навигацией
const aboutPage = readFileSync('./navbar-app/about.html');   // Страница "О нас"
const homeStyles = readFileSync('./navbar-app/styles.css');  // Файл стилей
const homeImage = readFileSync('./navbar-app/logo.svg');     // Логотип сайта
const homeLogic = readFileSync('./navbar-app/browser-app.js'); // Клиентский JavaScript

// Создаём HTTP сервер
const server = http.createServer((req, res) => {
    // Получаем URL из запроса
    const url = req.url;
    console.log(url); // Выводим URL в консоль для отладки

    // Маршрутизация запросов
    
    // Обработка главной страницы
    if (url === '/' || url === '/home') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(homePage);
        res.end();
    }
    // Обработка страницы "О нас"
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(aboutPage);
        res.end();
    }
    // Отдаём CSS файл
    else if (url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' });
        res.write(homeStyles);
        res.end();
    }
    // Отдаём SVG логотип
    else if (url === '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' });
        res.write(homeImage);
        res.end();
    }
    // Отдаём JavaScript файл
    else if (url === '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' });
        res.write(homeLogic);
        res.end();
    }
    // Если страница не найдена - отдаём 404
    else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1>Страница не найдена</h1>');
        res.end();
    }
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
    console.log('\nСервер запущен! Доступные страницы:');
    console.log('Главная страница: http://localhost:3000');
    console.log('Страница "О нас": http://localhost:3000/about');
    console.log('Стили: http://localhost:3000/styles.css');
    console.log('Логотип: http://localhost:3000/logo.svg');
    console.log('JavaScript: http://localhost:3000/browser-app.js');
});