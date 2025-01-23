/*
Этот код создает HTTP-сервер, который отправляет клиенту JSON-объект как ответ.
http.createServer: создает сервер.
res.writeHead: устанавливает заголовки HTTP-ответа (в данном случае, тип контента — JSON).
res.end: отправляет сериализованный JSON-объект клиенту.
*/

const http = require('http'); // Импорт модуля HTTP

// Создание сервера
http.createServer((req, res) => {
    // Установка заголовков ответа
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Объект, который будет отправлен клиенту
    const obj = {
        firstname: 'John',
        lastname: 'Doe'
    };

    // Сериализация объекта в JSON и отправка
    res.end(JSON.stringify(obj));
}).listen(3000, () => {
    console.log('Server is running at http://localhost:3000'); // Логирование в консоль
});