const express = require('express');
const app = express();
const port = 3000;

// Массив пользователей
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

// Middleware для логирования запросов
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(`[${req.method}] ${req.path} - ${timestamp}`);
    next();
};

// Middleware для проверки прав доступа
const checkAdmin = (req, res, next) => {
    const user = req.query.user;
    if (req.path === '/admin') {
        if (!user) {
            return res.status(403).send('Access Denied');
        }
        if (user !== 'admin') {
            return res.status(403).send('Access Denied');
        }
        console.log('User authorized');
    }
    next();
};

// Middleware для добавления приветствия
const greetingMiddleware = (req, res, next) => {
    req.greeting = 'Hello';
    next();
};

// Middleware для добавления прощания
const goodbyeMiddleware = (req, res, next) => {
    req.goodbye = 'Goodbye';
    next();
};

// Применяем middleware
app.use(logger);
app.use(checkAdmin);
app.use(greetingMiddleware);
app.use(goodbyeMiddleware);

// HTML-код для отображения всех пользователей
app.get('/users', (req, res) => {
    let html = '<h1>Users List</h1><ul>';
    users.forEach(user => {
        html += `<li>${user.name} - <a href="/users/${user.id}">View Details</a></li>`;
    });
    html += '</ul>';
    res.send(html);
});

// Маршрут для отдельного пользователя с приветствием и прощанием
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.send(`${req.greeting}, ${user.name}! ${req.goodbye}`);
});

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.send('Добро пожаловать на главную!');
});

// Маршрут для админ-панели
app.get('/admin', (req, res) => {
    res.send('Welcome to the Admin Page!');
});

// Публичный маршрут
app.get('/public', (req, res) => {
    res.send('This is a public page.');
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});

/*
Этот код выполняет все требования домашнего задания:

Создает новый файл Express.js
Показывает HTML-код со списком всех пользователей из массива /users
Использует два middleware для добавления "Hello" и "Goodbye"
Как это работает:

При переходе на /users вы увидите HTML-список всех пользователей с ссылками на их профили
При клике на ссылку пользователя (например, /users/1) вы увидите сообщение:
"Hello, John! Goodbye" (для пользователя с id=1)
"Hello, Jane! Goodbye" (для пользователя с id=2) и т.д.
Чтобы протестировать:

Запустите сервер: node HW.js
Откройте в браузере http://localhost:3000/users
Кликайте на ссылки пользователей, чтобы увидеть приветствия

*/