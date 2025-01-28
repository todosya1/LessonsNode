const express = require('express');
const app = express();
const port = 3010;

// 1. Global Middleware (Глобальный)
// Будет выполняться для всех запросов
app.use((req, res, next) => {
    console.log('🌍 Глобальный middleware:', new Date().toLocaleString());
    next();
});


// 2. Local Middleware (Локальный)
// Будет выполняться только для конкретного маршрута
const routeMiddleware = (req, res, next) => {
    console.log('🎯 Локальный middleware для /route');
    next();
};

app.get('/route', routeMiddleware, (req, res) => {
    res.send('Ответ из /route');
});

// 3. Embedded Middleware (Встроенный)
// Express.json() - для обработки JSON-данных
app.use(express.json());
// Express.static() - для статических файлов
app.use(express.static('public'));

// 4. Custom Middleware (Пользовательский)
const customMiddleware = (req, res, next) => {
    console.log(`🛣️ Путь запроса: ${req.path}`);
    next();
};

app.use(customMiddleware);

// Пример использования всех типов middleware
app.post('/api/data', (req, res) => {
    // Благодаря express.json() мы можем использовать req.body
    console.log('📦 Полученные данные:', req.body);
    res.json({ message: 'Данные получены' });
});

// Простой маршрут для тестирования
app.get('/', (req, res) => {
    res.send(`
        <h1>Тестирование Middleware</h1>
        <p>Проверьте консоль сервера, чтобы увидеть работу middleware</p>
        <ul>
            <li><a href="/route">Тест локального middleware (/route)</a></li>
            <li><a href="/api/data">Тест POST запроса (/api/data)</a></li>
        </ul>
    `);
});

app.listen(port, () => {
    console.log(`
    🚀 Сервер запущен на http://localhost:${port}
    
    Доступные эндпоинты:
    1. GET  /            - Главная страница
    2. GET  /route       - Тест локального middleware
    3. POST /api/data    - Тест обработки JSON данных
    
    💡 Для тестирования POST запроса используйте Postman или curl:
    curl -X POST -H "Content-Type: application/json" -d '{"test":"data"}' http://localhost:${port}/api/data
    `);
});

/*
Анализ кода:
1. Типы middleware:
   - Глобальный (app.use) - для всех запросов
   - Локальный (routeMiddleware) - для конкретного маршрута
   - Встроенный (express.json, express.static) - встроенные функции Express
   - Пользовательский (customMiddleware) - собственные функции

2. Особенности:
   - Все middleware имеют доступ к req, res и next
   - Порядок middleware важен (выполняются сверху вниз)
   - next() необходим для передачи управления следующему middleware
   - Можно комбинировать разные типы middleware

3. Практическое применение:
   - Логирование запросов
   - Обработка данных
   - Статические файлы
   - Отслеживание путей
*/