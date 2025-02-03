const express = require('express');           // Импортируем фреймворк Express
const app = express();                        // Создаем экземпляр приложения Express
const userRoutes = require('./routes/user');  // Импортируем маршруты пользователей
const productRoutes = require('./routes/products'); // Импортируем маршруты продуктов
const orderRoutes = require('./routes/orders'); // Импортируем маршруты заказов
const port = 3000;                            // Устанавливаем порт для сервера
const db = require('./database/dbSingleton')  // Устанавливаем фичу для БД
const bcrypt = require('bcrypt');             // Импортируем bcrypt для хэширования паролей
const articlesRoutes = require('./routes/articles'); // Импортируем маршруты статей

// Подключаем middleware для обработки JSON-данных в запросах
app.use(express.json());

// Базовый маршрут
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to our shop API!',
        endpoints: {
            users: '/users',
            products: '/products',
            orders: '/orders'
        }
    });
});

// Подключаем маршруты
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/articles', articlesRoutes); // task#2 - статьи

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error(err); // Log the error
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
});

// Запускаем сервер на указанном порту
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('=== Available Routes ===');
    console.log(`http://localhost:${port}/users`);
    console.log(`http://localhost:${port}/articles`);
   
    console.log('\nUsers:');
    console.log(`GET    http://localhost:${port}/users`);
    console.log(`GET    http://localhost:${port}/users/WRITE_YOUR_ID_HERE`);
    console.log(`POST   http://localhost:${port}/users`);
    console.log(`POST   http://localhost:${port}/users/login`);
    console.log(`PUT    http://localhost:${port}/users/:id`);
    console.log(`DELETE http://localhost:${port}/users/:id`);

    console.log('\nArticles:');
    console.log(`GET    http://localhost:${port}/articles`);
    console.log(`GET    http://localhost:${port}/articles/WRITE_YOUR_ID_HERE`);
    console.log(`POST   http://localhost:${port}/articles`);
    console.log(`PUT    http://localhost:${port}/articles/:id`);
    console.log(`DELETE http://localhost:${port}/articles/:id`);

});