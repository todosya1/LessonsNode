/*
Анализ кода:
Сначала импортируются модули http, url, fs.
Считываются HTML-шаблоны из папки templates и сохраняются в переменные.
Сервер создан с помощью http.createServer и слушает порт 3000.
В зависимости от URL-адреса (pathname) возвращается нужный HTML-файл:
/ → home.html.
/books → books.html.
/book → book.html.
В остальных случаях возвращается ошибка 404 с сообщением "Page not found".
*/

const http = require('http'); // Импорт модуля http
const url = require('url'); // Импорт модуля url для обработки URL-адресов
const fs = require('fs'); // Импорт модуля fs для работы с файлами

// Чтение HTML-файлов из папки templates
const home = fs.readFileSync(`${__dirname}/templates/home.html`); 
const books = fs.readFileSync(`${__dirname}/templates/books.html`);
const book = fs.readFileSync(`${__dirname}/templates/book.html`);

// Создание сервера
const server = http.createServer((req, res) => {
    const pathNameFull = req.url; // Получение полного URL
    console.log(pathNameFull); // Логирование полного пути

    const pathNameObj = url.parse(pathNameFull, true); // Разбор URL в объект
    console.log(pathNameObj); // Логирование объекта URL

    const pathName = pathNameObj.pathname; // Извлечение пути без параметров
    console.log(pathName); // Логирование чистого пути

    // Маршрутизация (Routing)
    if (pathName === '/') {
        res.setHeader('Content-Type', 'text/html'); // Установка типа контента
        res.end(home); // Возвращение главной страницы
    } else if (pathName === '/books') {
        res.setHeader('Content-Type', 'text/html');
        res.end(books); // Возвращение страницы с книгами
    } else if (pathName === '/book') {
        res.setHeader('Content-Type', 'text/html');
        res.end(book); // Возвращение страницы одной книги
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' }); // Ошибка 404
        res.end('<h1>Page not found</h1>');
    }
});

// Слушаем порт 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
    console.log('Server is running at http://localhost:3000/books');
    console.log('Server is running at http://localhost:3000/book');
    console.log('Server is running at http://localhost:3000/asdasd');
});


