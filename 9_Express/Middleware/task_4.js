// Импортируем необходимые модули
// express - основной фреймворк для создания веб-приложения
const express = require('express');
// logger - промежуточное ПО (middleware) для логирования запросов
const logger = require('./logger');
// authorize - промежуточное ПО для проверки авторизации
const authorize = require('./authorize');

// Инициализируем приложение Express
const app = express();
// Определяем порт для запуска сервера
// process.env.PORT - берём значение из переменных окружения, если оно есть
// или используем порт 3000 по умолчанию
const port = process.env.PORT || 3000;

// Подключаем middleware (промежуточное ПО)
// app.use позволяет применить middleware ко всем маршрутам
// [logger, authorize] - массив middleware, которые будут выполняться последовательно
// req => middleware => res - показывает порядок обработки запроса
app.use([logger, authorize]);

// Определяем маршруты приложения

// Маршрут для главной страницы '/'
app.get('/', (req, res) => {
  res.send('Home');
});

// Маршрут для страницы 'about'
app.get('/about', (req, res) => {
  res.send('About');
});

// Запускаем сервер на указанном порту
// Выводим сообщение в консоль после успешного запуска
app.listen(port, () => {
  // Используем console.log с кликабельной ссылкой
  console.log(`Server is running at http://localhost:${port}/`);
});
