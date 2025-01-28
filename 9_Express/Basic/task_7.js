
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3007;

// Читаем данные пользователей из файла
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

//________________________4________________________
// Фильтрация пользователей по возрасту
app.get('/api/users/filter', (req, res) => { 
    const minAge = Number(req.query.minAge);
    const maxAge = Number(req.query.maxAge);

    if (isNaN(minAge) || isNaN(maxAge)) {
        return res.status(400).send({ message: 'Некорректные параметры запроса' });
    }

    const filteredUsers = users.filter(user => user.age >= minAge && user.age <= maxAge);

    if (filteredUsers.length === 0) {
        return res.status(404).send({ message: 'Пользователи не найдены' });
    }

    res.json(filteredUsers);
})

//________________________2________________________
// Получение пользователя по ID через API
app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));

    if(user === undefined) {
        return res.status(404).send({message: 'Пользователь не найден'}); 
    }

    res.send(user);
})

//________________________1________________________
// Получение списка всех пользователей
app.get('/api/users', (req, res) => {
    res.send(users);
})

//________________________3________________________
// Получение информации о пользователе в HTML формате
app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));

    if(user === undefined) {
        return res.status(404).send({message: 'Пользователь не найден'}); 
    }

    res.send(
        `<html>
            <head>
                <title>Информация о пользователе</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .user-info { padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
                </style>
            </head>
            <body>
                <div class="user-info">
                    <h1>Информация о пользователе</h1>
                    <p><strong>Имя:</strong> ${user.name}</p>
                    <p><strong>Возраст:</strong> ${user.age}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                </div>
            </body>
        </html>`
    );
})

// Запуск сервера с выводом доступных эндпоинтов
app.listen(port, () => {
    console.log('\nСервер запущен! Доступные эндпоинты:');
    console.log(`\n1. Список всех пользователей:\n   http://localhost:${port}/api/users`);
    console.log(`\n2. Получить пользователя по ID (пример для ID=1):\n   http://localhost:${port}/api/users/1`);
    console.log(`\n3. Информация о пользователе в HTML (пример для ID=1):\n   http://localhost:${port}/users/1`);
    console.log(`\n4. Фильтрация по возрасту (пример: от 25 до 30 лет):\n   http://localhost:${port}/api/users/filter?minAge=25&maxAge=30`);
    console.log('\nАнализ кода:');
    console.log('• Реализовано 4 эндпоинта для работы с данными пользователей');
    console.log('• Используется обработка ошибок для несуществующих пользователей');
    console.log('• Поддерживается фильтрация по возрасту с валидацией параметров');
    console.log('• HTML-представление данных включает базовую стилизацию');
});