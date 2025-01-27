const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Обработка GET-запроса
app.get('/', (req, res) => {
    res.json([{ name: 'tania' }]); // Отправка JSON-ответа
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

/*
Что происходит:
GET-запрос: При обращении к корневому URL (/), сервер отправляет JSON-ответ: [{"name": "tania"}].
Postman: Используя Postman, вы можете отправить GET-запрос на http://localhost:3000 и увидеть этот JSON-ответ.
*/