const express = require('express');           // Импортируем фреймворк Express
const app = express();                        // Создаем экземпляр приложения Express
const userRoutes = require('./routes/user');  // Импортируем маршруты пользователей из отдельного файла
const port = 3000;                            // Устанавливаем порт для сервера

// Подключаем middleware для обработки JSON-данных в запросах
app.use(express.json());

// Подключаем маршруты пользователей. Все запросы к /users будут обрабатываться в userRoutes
app.use('/users', userRoutes);

// Запускаем сервер на указанном порту
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});