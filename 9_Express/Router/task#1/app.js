const express = require('express');
const app = express();
const port = 3000;

// Middleware для обработки JSON
app.use(express.json());

// Подключаем роутеры
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

// Используем роутеры
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Обработка 404 для несуществующих маршрутов
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`
Available routes:
- GET    /api/users           (get all users)
- GET    /api/users/:id       (get user by id)
- POST   /api/users           (create new user)
- PUT    /api/users/:id       (update user)
- DELETE /api/users/:id       (delete user)
- GET    /api/admin           (admin dashboard)
- GET    /api/admin/stats     (admin statistics)
- POST   /api/admin/create    (create admin resource)
    `);
});