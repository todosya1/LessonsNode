/* Типы параметров в API:
1. Query Parameters (Параметры запроса):
Используются для передачи данных в URL после знака ?.
Пример: GET https://example.com/api/users?name=Alice&age=25
Сервер:

app.get('/api/users', (req, res) => {
    const { name, age } = req.query;
    if (name) res.write(`Name: ${name}\n`);
    if (age) res.write(`Age: ${age}`);
    res.end();
});

*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/users', (req, res) => {
    const { name, age } = req.query;
    let response = '';
    if (name) response += `Name: ${name}\n`;
    if (age) response += `Age: ${age}`;
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});