const express = require('express');
const app = express();
const port = 3000;

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

// Применяем middleware
app.use(logger);
app.use(checkAdmin);

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
Чтобы протестировать его:

Запустите сервер:
bash
CopyInsert in Terminal
node HW2.js
Проверьте разные URL:
Публичная страница:

http://localhost:3000/public
Админ-панель без прав:

http://localhost:3000/admin
Админ-панель с правами:

http://localhost:3000/admin?user=admin
В консоли вы увидите логи в формате:

CopyInsert
[GET] /public - 2024-11-20 14:05:30
[GET] /admin - 2024-11-20 14:06:00
[GET] /admin - 2024-11-20 14:06:30
User authorized
Этот код полностью соответствует требованиям второго домашнего задания с логированием и проверкой прав доступа.


*/