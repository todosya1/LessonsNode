const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/* Чтение файла data.json и его парсинг в объект JavaScript. */
const data = JSON.parse(fs.readFileSync(__dirname + '/data.json'));

// Обработка GET-запроса
app.get('/', (req, res) => {
    res.status(200).json(data); // Отправляем JSON-ответ с данными
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

/*
Объяснение:
1. Импортируем модули fs и express.
2. Создаем приложение Express и устанавливаем порт.
3. Читаем и парсим файл data.json в объект JavaScript.
4. Определяем маршрут для корневого URL, который возвращает JSON-данные.
5. Запускаем сервер и выводим сообщение о прослушивании порта.

Ответ:
- При обращении к корневому URL (`/`), клиент получит JSON-ответ с данными из data.json.
*/