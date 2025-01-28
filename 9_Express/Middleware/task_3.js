// Импортируем фреймворк Express
const express = require('express');
// Создаем экземпляр приложения
const app = express();
// Устанавливаем порт (из переменной окружения или 3000)
const port = process.env.PORT || 3000;

// Middleware №1: будет выполняться для всех маршрутов, начинающихся с '/'
// То есть для ВСЕХ маршрутов, так как все они начинаются с '/'
app.use('/', (req, res, next) => {
    console.log('This always runs!');
    // Передаем управление следующему middleware
    next(); // continue to the next middleware
});

// Middleware №2: будет выполняться только для маршрута '/add-product'
app.use('/add-product', (req, res, next) => {
    console.log('In another middleware for add product!');
    // Отправляем ответ клиенту
    res.send('<h1>The "Add Product" Page</h1>');
    // next() здесь не нужен, так как мы уже отправили ответ
    // Если бы мы написали next(), он бы не выполнился
    // после res.send()
});

// Middleware №3: будет выполняться для всех маршрутов,
// начинающихся с '/', кроме '/add-product',
// так как для него уже отправлен ответ
app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>');
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

/*
Анализ кода:

1. Порядок выполнения middleware:
   - Middleware выполняются сверху вниз
   - Если путь запроса совпадает с путем middleware, он выполняется
   - После res.send() следующие middleware не выполняются
   
2. Примеры запросов:
   GET /
   ├─ Выполнится middleware №1 (/)
   └─ Выполнится middleware №3 (/)
   
   GET /add-product
   ├─ Выполнится middleware №1 (/)
   └─ Выполнится middleware №2 (/add-product)
   
   GET /anything-else
   ├─ Выполнится middleware №1 (/)
   └─ Выполнится middleware №3 (/)

3. Важные моменты:
   - Порядок middleware критически важен!
   - '/add-product' должен быть ДО '/',
     иначе до него никогда не дойдет выполнение
   - next() нужен только если мы хотим продолжить
     выполнение следующих middleware
   - res.send() завершает цепочку middleware

4. Возможные улучшения:
   - Добавить обработку POST запросов
   - Использовать Router для группировки маршрутов
   - Добавить обработку ошибок
   - Структурировать маршруты по модулям
   - Добавить валидацию данных
*/