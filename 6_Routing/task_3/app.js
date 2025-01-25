/* Анализ кода:
Импортируются модули http, url, fs, и path.
Сервер обрабатывает запросы, поддерживает маршруты и файлы:
/ — возвращает home.html.
Запросы с расширением .html — возвращают соответствующий HTML-файл.
Запросы с расширением .css — возвращают CSS-файл с корректным заголовком text/css.
Для неизвестных маршрутов возвращается ошибка 404. */

/*Метод match()
req.url.match('[.]html$'):

Проверяет, заканчивается ли URL-адрес на .html.
Используется регулярное выражение:
. — любой символ.
html — проверка конкретного текста.
$ — конец строки.
fs.createReadStream vs res.end()
res.end():
Считывает файл полностью перед отправкой.
Может быть неэффективным для больших файлов, так как полностью занимает память перед отправкой данных.
fs.createReadStream:
Использует потоки, читая данные блоками.
Более эффективен для работы с большими файлами.
*/
const http = require('http'); // Импорт модуля http
const url = require('url'); // Импорт модуля url для работы с URL
const fs = require('fs'); // Импорт модуля fs для работы с файлами
const path = require('path'); // Импорт модуля path для обработки путей

// Создание сервера
const server = http.createServer((req, res) => {
    const pathNameFull = req.url; // Получение полного URL
    const pathNameObj = url.parse(pathNameFull, true); // Разбор URL в объект
    const pathName = pathNameObj.pathname; // Извлечение пути без параметров

    if (pathName === '/') {
        // Если корневой маршрут
        const htmlPath = path.join(__dirname, 'templates', 'home.html'); // Путь к home.html
        const fileStream = fs.createReadStream(htmlPath, 'UTF-8'); // Создание потока чтения файла
        res.writeHead(200, { 'Content-Type': 'text/html' }); // Установка заголовка
        fileStream.pipe(res); // Передача данных потока в ответ
    } else if (req.url.match(/\.html$/)) {
        // Если запрос на HTML-файл
        const htmlPath = path.join(__dirname, 'templates', req.url); // Путь к HTML-файлу
        const fileStream = fs.createReadStream(htmlPath, 'UTF-8'); // Создание потока чтения
        res.writeHead(200, { 'Content-Type': 'text/html' }); // Установка заголовка
        fileStream.pipe(res); // Передача данных потока в ответ
    } else if (req.url.match(/\.css$/)) {
        // Если запрос на CSS-файл
        const cssPath = path.join(__dirname, 'templates/css', req.url); // Путь к CSS-файлу
        const fileStream = fs.createReadStream(cssPath, 'UTF-8'); // Создание потока чтения
        res.writeHead(200, { 'Content-Type': 'text/css' }); // Установка заголовка
        fileStream.pipe(res); // Передача данных потока в ответ
    } else {
        // Если путь не найден
        res.writeHead(404, { 'Content-Type': 'text/html' }); // Установка заголовка
        res.end('<h1>Page not found</h1>'); // Ответ с ошибкой 404
    }
});

// Сервер слушает порт 3000
server.listen(3000, () => {
    console.log('Node.js web server at port 3000 is running...');
    console.log('Server is running at http://localhost:3000');
    console.log('Server is running at http://localhost:3000/books.html');
    console.log('Server is running at http://localhost:3000/home.html');
    console.log('Server is running at http://localhost:3000/book.html');
    console.log('Server is running at http://localhost:3000/qweqwe.html');
});
