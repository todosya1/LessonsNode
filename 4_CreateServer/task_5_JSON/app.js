const http = require('http'); // Импорт модуля HTTP
const fs = require('fs'); // Импорт модуля файловой системы

// Чтение файла data.json
let data = fs.readFileSync(__dirname + '/data/data.json', 'utf8');
console.log(data); // Логирование данных

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
  // Логирование запроса
  console.log(req);

  // Установка заголовков ответа
  res.setHeader('Content-Type', 'application/json');

  // Отправка данных клиенту
  res.end(data);
});

// Запуск сервера на порту 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
