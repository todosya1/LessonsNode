/* Body Parameters (Параметры тела):
Передаются в теле запроса (обычно в POST, PUT, PATCH).
Пример: POST https://example.com/api/users с данными JSON в теле.
Сервер:

app.use(express.json());
app.post('/api/users', (req, res) => {
    const userData = req.body;
    console.log(userData);
    res.end();
});
*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/users', (req, res) => {
    const userData = req.body;
    console.log(userData);
    res.send(userData);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
