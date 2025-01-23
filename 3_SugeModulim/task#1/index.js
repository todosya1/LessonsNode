const fs = require('fs'); // Подключаем модуль файловой системы

// Читаем содержимое файла синхронно
const textIn = fs.readFileSync('./text/input.txt', 'utf-8');
console.log(textIn);

// Обрабатываем прочитанный текст
const textOut = `The text was: ${textIn}`;
console.log(textOut);
