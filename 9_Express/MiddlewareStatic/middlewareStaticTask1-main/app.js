// Подключаем необходимые модули
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


// Используем middleware express.static для обработки статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

/*
// ** Route for CSS
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

// ** Route for JS
app.get('/js.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js.js'));
});

// ** Route for image
app.get('/1.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '1.jpg'));
});

// Route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
})
// 404 error handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
*/
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
Анализ изменений:
1. Добавлен middleware express.static, который автоматически обрабатывает 
   все статические файлы из директории 'public'

2. Больше не нужны отдельные маршруты для CSS, JS и изображений, так как 
   express.static автоматически обрабатывает эти запросы

3. Оставлен только маршрут для главной страницы

4. Все статические файлы (стили, скрипты, изображения) теперь будут 
   автоматически доступны при обращении к соответствующим путям



Метод express.static() позволяет обслуживать статические файлы (такие как HTML, изображения, CSS, JavaScript и другие медиафайлы). Этот middleware упрощает процесс обработки статических файлов, избавляя от необходимости писать отдельные обработчики для каждого файла.
Как это работает?

Когда приходит запрос ресурса, Express ищет его в указанной директории:
Если файл найден, он отправляется напрямую
Если файл не найден, запрос передается следующему middleware или route handler
Обработка ошибок:

Если файл не найден, Express автоматически передаст запрос следующему middleware
*/
   