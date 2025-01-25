// Подключаем необходимые модули Node.js
const http = require('http');    // Для создания HTTP сервера
const url = require('url');      // Для парсинга URL адресов
const fs = require('fs');        // Для работы с файловой системой
const path = require('path');    // Для работы с путями файлов

// Создаем HTTP сервер
const server = http.createServer(function (req, res) {
    // Парсим полный URL запроса, включая параметры запроса
    const parsedUrl = url.parse(req.url, true);
    
  // Extract pathname and query
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

    if (pathname === '/') {
        try {
            const data = fs.readFileSync(path.join(__dirname, 'templates', 'home.html'), 'utf8');

            // Персонализируем контент: если в запросе есть параметр name,
            // заменяем плейсхолдер {{name}} на значение из запроса
            // Если параметр name отсутствует, используем 'Гость'
            let name = query.name || 'Гость';
            const personalizedContent = data.replace('{{name}}', name);

            // Отправляем персонализированный HTML клиенту
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(personalizedContent);
        } catch (err) {
            // В случае ошибки отправляем код 500 (Внутренняя ошибка сервера)
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Ошибка сервера</h1>');
        }
    } else {
        // Если запрошенный путь не найден, отправляем код 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Страница не найдена</h1>');
    }
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
    console.log('\nСервер запущен! Доступные URL:');
    console.log('Базовый URL: http://localhost:3000');
    console.log('С параметром имени: http://localhost:3000/?name=Алсу');
    console.log('С другим именем: http://localhost:3000/?name=Иван');
});

/*
Этот код делает следующее:

Импорты модулей:
http - для создания веб-сервера
url - для работы с URL и параметрами запроса
fs - для чтения файлов
path - для работы с путями файлов
Основная логика:
Создаёт HTTP сервер
Парсит входящие URL запросы
Извлекает параметры запроса (например, ?name=Алсу)
Читает HTML файл и подставляет в него имя из параметров
Если имя не указано, использует "Гость"
Обработка ошибок:
Отлавливает ошибки при чтении файла
Возвращает 404 для несуществующих страниц
Возвращает 500 при внутренних ошибках сервера
Улучшенный вывод в консоль:
Показывает базовый URL
Показывает примеры с разными параметрами
Все URL кликабельны
*/