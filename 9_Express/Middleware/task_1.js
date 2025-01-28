const express = require('express');
const app = express();
const port = process.env.PORT || 3011;

// Первый middleware
// Выполняется для каждого запроса
app.use((req, res, next) => {
    console.log('🔍 Первый middleware:');
    console.log(`   Время запроса: ${new Date().toLocaleString()}`);
    console.log(`   URL запроса: ${req.url}`);
    console.log(`   Метод запроса: ${req.method}`);
    // next() передает управление следующему middleware
    next();
});

// Второй middleware
// Также выполняется для каждого запроса
app.use((req, res, next) => {
    console.log('🎯 Второй middleware:');
    console.log('   Готов отправить ответ!');
    // res.send() отправляет ответ и завершает запрос
    // в отличие от res.write(), который позволяет отправлять множество ответов
    res.send('<h1>Привет от Express!</h1>');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`
    🚀 Сервер запущен на http://localhost:${port}
    
    📝 Что происходит при запросе:
    1. Первый middleware логирует информацию о запросе
    2. Функция next() передает управление второму middleware
    3. Второй middleware отправляет ответ клиенту
    
    💡 Откройте консоль браузера (F12) и перезагрузите страницу,
       чтобы увидеть результаты работы обоих middleware
    `);
});

/*
Анализ кода:
1. Последовательность выполнения:
   - Клиент делает запрос
   - Первый middleware логирует информацию
   - next() передает управление дальше
   - Второй middleware отправляет ответ
   - Соединение закрывается

2. Ключевые моменты:
   - next() необходим для передачи управления
   - res.send() завершает запрос
   - Без next() второй middleware не выполнится
   - Порядок middleware важен

3. Что увидит клиент:
   - В браузере: "Привет от Express!"
   - В консоли сервера: информация о запросе
*/