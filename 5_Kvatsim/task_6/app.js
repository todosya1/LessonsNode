// Код создает HTTP-сервер, который читает файл index.htm с помощью потока
const http = require('http'); // Импорт модуля HTTP
const fs = require('fs'); // Импорт модуля для работы с файлами

// Создание сервера
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // Устанавливаем тип контента HTML
    const fileStream = fs.createReadStream(__dirname + '/index.htm'); // Читаем файл потоком
    fileStream.pipe(res); // Передаем содержимое файла клиенту
});

// Сервер слушает порт 3000
server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000'); // Лог успешного запуска
});

