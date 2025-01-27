/*
2. Path Parameters (Параметры пути):
Включены в сам путь URL.
Пример: GET https://example.com/api/users/123
Сервер

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    res.write(`UserId: ${id}`);
    res.end();
});
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    res.send(`UserId: ${id}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});