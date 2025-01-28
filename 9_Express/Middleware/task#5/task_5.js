// Импортируем необходимые модули
const express = require('express');
const logger = require('./logger');

// Инициализируем приложение Express
const app = express();
const port = 3000;

// Middleware для обработки JSON в теле запроса
app.use(express.json());

// Подключаем middleware для логирования
app.use(logger);

// Список пользователей для проверки авторизации
const users = [
    { username: 'admin123', password: 'admin123', role: 'admin' },
    { username: 'admin234', password: 'admin234', role: 'admin' },
    { username: 'user123', password: 'user123', role: 'user' },
    { username: 'user678', password: 'user678', role: 'user' }
];

// Хранение текущего авторизованного пользователя
let currentUser = null;

// Middleware для проверки авторизации
const authMiddleware = (req, res, next) => {
    // Проверяем, есть ли авторизованный пользователь
    if (!currentUser) {
        return res.status(401).send('User is not authorized.');
    }
    // Если пользователь авторизован, передаем управление дальше
    next();
};

// Middleware для проверки роли админа
const adminMiddleware = (req, res, next) => {
    if (!currentUser || currentUser.role !== 'admin') {
        return res.status(403).send('Access denied: insufficient rights');
    }
    next();
};

// Middleware для проверки роли пользователя
const userMiddleware = (req, res, next) => {
    if (!currentUser || (currentUser.role !== 'user' && currentUser.role !== 'admin')) {
        return res.status(403).send('Access denied: insufficient rights');
    }
    next();
};

// Маршрут для авторизации
app.post('/login', (req, res) => {
    // Получаем данные из тела запроса
    const { username, password } = req.body;

    // Ищем пользователя в массиве users
    const user = users.find(u => u.username === username && u.password === password);

    // Если пользователь найден
    if (user) {
        // Сохраняем в currentUser
        currentUser = user;
        // Отправляем успешный ответ
        res.json({
            message: "Successful login",
            user: {
                username: user.username,
                role: user.role
            }
        });
    } else {
        // Если пользователь не найден, отправляем ошибку
        res.status(401).json({
            error: "Invalid login or password"
        });
    }
});

// Маршрут для выхода из системы
app.post('/logout', (req, res) => {
    // Очищаем информацию о текущем пользователе
    currentUser = null;
    // Отправляем сообщение об успешном выходе
    res.json({ message: "Logout successful" });
});

// Маршрут для главной страницы
app.get('/', (req, res) => {
    if (currentUser) {
        // Если пользователь авторизован, показываем ссылку на выход
        res.send('Main page. <a href="/logout">Logout</a>');
    } else {
        // Если пользователь не авторизован, показываем ссылку на вход
        res.send('Main page. <a href="/login">Login</a>');
    }
});

// Маршрут для админ-панели
app.get('/admin', [authMiddleware, adminMiddleware], (req, res) => {
    res.send('Welcome to the admin panel');
});

// Маршрут для профиля пользователя
app.get('/user/profile', [authMiddleware, userMiddleware], (req, res) => {
    res.send(`Welcome, ${currentUser.username}. This is your profile`);
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});