const express = require('express');  // Импортируем Express
const app = express();               // Создаем приложение Express

const port = process.env.PORT || 3000; // Устанавливаем порт

// Импортируем данные о продуктах
const { products } = require('./data');

// Обработка GET-запроса на корневой URL
app.get('/', (req, res) => {
    res.json(products); // Отправляем JSON-ответ с продуктами
});

// Запуск сервера на заданном порту
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/*
Объяснение:
1. Импорт и инициализация:
   - Импортируем модуль Express и создаем приложение `app`.
2. Порт:
   - Устанавливаем порт из переменных окружения или по умолчанию 3000.
3. Данные:
   - Импортируем массив `products` из файла data.js.
4. Маршрут:
   - Определяем маршрут для корневого URL (`/`), который возвращает JSON с продуктами.
5. Запуск сервера:
   - Запускаем сервер и выводим сообщение о прослушивании порта.

Ответ:
- При обращении к корневому URL (`/`), клиент получит JSON-ответ с данными о продуктах.
*/