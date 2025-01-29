const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const port = process.env.PORT || 3000;

// Middleware for JSON processing (if required)
app.use(express.json());
app.use(express.static('public'));

// Routers
app.use('/api/users', userRoutes); // All user routes
app.use('/api/products', productRoutes); // All product routes

// Main Page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Main Page</h1>');
});

// Processing route 404
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*

Это полное REST API приложение на Express.js, которое реализует операции CRUD (Создание, Чтение, Обновление, Удаление) для пользователей. Вот подробное описание:

Основное приложение (app.js):
Настраивает Express сервер
Использует промежуточное ПО для обработки JSON и статических файлов
Направляет все запросы /api/users на маршрутизатор пользователей
Имеет простую страницу приветствия на корневом маршруте
Включает обработчик 404 для неопределенных маршрутов
Работает на порту 3000 по умолчанию
Маршруты пользователей (routes/users.js):
GET /api/users - Возвращает всех пользователей
GET /api/users/:id - Возвращает конкретного пользователя по ID
POST /api/users - Создает нового пользователя
PUT /api/users/:id - Обновляет существующего пользователя
DELETE /api/users/:id - Удаляет пользователя
Хранение данных (data.js):
Содержит примеры данных пользователей и продуктов
Каждый пользователь имеет поля: id, name, email, age, city и isActive
В настоящее время содержит 4 примера пользователей
Чтобы протестировать это API, вы можете использовать любой инструмент тестирования API (например, Postman) или команды curl:

Получить всех пользователей:
CopyInsert
GET http://localhost:3000/api/users
Получить конкретного пользователя:
CopyInsert
GET http://localhost:3000/api/users/1
Создать нового пользователя:
CopyInsert
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "id": 5,
  "name": "Новый Пользователь",
  "email": "new.user@example.com",
  "age": 40,
  "city": "Москва",
  "isActive": true
}
Обновить пользователя:
CopyInsert
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "id": 1,
  "name": "Обновленное Имя",
  "email": "updated.email@example.com",
  "age": 26,
  "city": "Санкт-Петербург",
  "isActive": false
}
Удалить пользователя:
CopyInsert
DELETE http://localhost:3000/api/users/1
Приложение уже настроено и готово к использованию. Вам нужно только запустить его командой:

CopyInsert
node app.js
*/