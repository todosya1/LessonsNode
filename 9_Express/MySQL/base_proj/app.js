const express = require('express');           // Импортируем фреймворк Express
const app = express();                        // Создаем экземпляр приложения Express
const userRoutes = require('./routes/user');  // Импортируем маршруты пользователей
const productRoutes = require('./routes/products'); // Импортируем маршруты продуктов
const orderRoutes = require('./routes/orders'); // Импортируем маршруты заказов
const port = 3000;                            // Устанавливаем порт для сервера
const db = require('./database/dbSingleton')  // Устанавливаем фичу для БД

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
});