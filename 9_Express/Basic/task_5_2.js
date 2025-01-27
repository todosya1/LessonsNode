// Подключаем необходимые модули
const express = require('express');
const app = express();

// Устанавливаем порт из переменной окружения или используем 3000 по умолчанию
const port = process.env.PORT || 3000;

// Middleware для обработки JSON данных
app.use(express.json()); // Middleware для обработки JSON данных. Подробнее изучим позже

// Главная страница
app.get('/', function(req, res) {
    res.send('<h1>Hello world!</h1>');
});

// Маршрут с параметром в URL (path parameter)
app.get('/person/:id', function(req, res) {
    res.send(`<h1>Person: ${req.params.id}</h1>`);
});

// Маршрут с несколькими параметрами в URL (path parameters)
app.get('/student/:name/:age?', function(req, res) {
    console.log(req.params);
    res.send(`<h1>Person: ${req.params.name} age: ${req.params.age}</h1>`);
});

// Маршрут с параметрами запроса (query parameters)
app.get('/student', function(req, res) {
    const {name, age} = req.query;
    if(name) {
        console.log(name);
        res.write(`Name: ${name}\n`);
    }
    if(age) {
        console.log(age);
        res.write(`Age: ${age}`);
    }
    res.end();
});

// Маршрут для POST запроса с параметрами в теле (body parameters)
app.post('/student', function(req, res) {
    const {name, age} = req.body; // получаем параметры из тела запроса
    if(name) {
        console.log(name);
        res.write(`Name: ${name}\n`);
    }
    if(age) {
        console.log(age);
        res.write(`Age: ${age}`);
    }
    res.end();
});

// API эндпоинт, возвращающий JSON
app.get('/api', function(req, res) {
    res.json({ firstname: 'John', lastname: 'Doe' });
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`
Доступные маршруты:
1. GET http://localhost:${port}/ - главная страница
2. GET http://localhost:${port}/person/123 - пример path parameter
3. GET http://localhost:${port}/student/john/25 - пример множественных path parameters
4. GET http://localhost:${port}/student?name=john&age=25 - пример query parameters
5. POST http://localhost:${port}/student - пример body parameters (требует POST запрос)
6. GET http://localhost:${port}/api - пример JSON ответа
`);
});