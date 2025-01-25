/* 
Перевод задания:
Задача 1:
Создайте новую папку проекта.
Создайте файл app.js с приведенным ниже кодом.
Требования:
При переходе по ссылкам, указанным в примере, нужно проверить, что URL и параметры отображаются в консоли.
Примеры ссылок:

http://localhost:3000/product?id=0
http://localhost:3000/product?id=0&name=aaa
http://localhost:3000/product?id=0&name=aaa&category=electronics
*/
const http = require('http'); // Импорт модуля HTTP
const url = require('url'); // Импорт модуля URL

// Создание сервера
const server = http.createServer((req, res) => {
    // Получение полного URL запроса
    const pathName = req.url;
    console.log(pathName); // Логируем путь

    // Парсинг URL с помощью модуля url
    const parsedUrl = url.parse(pathName, true);
    console.log(parsedUrl); // Логируем полный объект URL

    // Извлечение query (параметров) и path (пути)
    const { query, path } = parsedUrl;
    console.log(query, path); // Логируем параметры и путь

    res.end('Task#1'); // Ответ клиенту
});

// Запуск сервера
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
console.log('`Server is running at http://localhost:${PORT}`');
