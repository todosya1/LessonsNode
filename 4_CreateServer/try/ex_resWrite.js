// 1. Код с использованием res.write() и res.end()
// Этот код создает HTTP-сервер, который отправляет текстовые данные клиенту по частям, используя res.write().
//  После отправки всех частей завершается вызовом res.end().
const http = require('http'); // Импорт модуля http

const server = http.createServer((req, res) => {
    // Устанавливаем заголовок ответа
    res.setHeader('Content-Type', 'text/plain');

    // Отправляем данные по частям
    res.write('Hello, ');
    res.write('this is part 1. ');
    res.write('And this is part 2. ');

    // Завершаем ответ
    res.end(' Goodbye!');
});

// Сервер начинает слушать на порту 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
