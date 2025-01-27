// Подключаем express фреймворк
const express = require('express');
const path = require('path');
const app = express();

// Устанавливаем порт из переменной окружения или используем 3003 по умолчанию
const port = process.env.PORT || 3003;

// Настраиваем статические файлы
app.use(express.static(path.join(__dirname)));

// Главная страница
app.get('/', function(req, res) {
  res.send('<html><head></head><body><h1>Hello world!</h1></body></html>');
});

// Страница About
app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Страница с динамическим параметром id
app.get('/person/:id', function (req, res) {
  res.send(
    '<html><head></head><body><h1>Person: ' +
      req.params.id +
      '</h1></body></html>'
  );
});

// Страница с обязательным параметром name и необязательным параметром age
app.get('/student/:name/:age?', function (req, res) {
  console.log(req.params);
  res.send(
    '<html><head></head><body><h1>Person: ' +
      req.params.name +
      ' age:' +
      req.params.age +
      '</h1></body></html>'
  );
});

// API эндпоинт, возвращающий JSON данные
app.get('/api', function(req, res) {
  res.json({ firstname: 'John', lastname: 'Doe' });
});

// Запускаем сервер на указанном порту
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`
Доступные маршруты:
- http://localhost:${port}/
- http://localhost:${port}/about
- http://localhost:${port}/person/123
- http://localhost:${port}/student/john/25
- http://localhost:${port}/api
  `);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Порт ${port} уже используется. Пожалуйста, используйте другой порт или освободите текущий.`);
  } else {
    console.error('Произошла ошибка при запуске сервера:', err);
  }
});