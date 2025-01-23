const fs = require('fs'); // Импортируем модуль файловой системы
const path = require('path'); // Импортируем модуль для работы с путями

// Получаем путь к директории text
const dirPath = path.join(__dirname, '/text');

// Читаем содержимое файла input.txt
const textIn = fs.readFileSync(`${dirPath}/input.txt`, 'utf-8');

// Разделяем содержимое файла на строки
const arr = textIn.split('\n');
console.table(arr);

// Обрабатываем каждую строку
for (let i = 0; i < arr.length; i++) {
    const line = arr[i].split(' '); // Разделяем строку по пробелам
    console.table(line); // Выводим данные в формате таблицы
}

// Формируем текст для записи в output.txt
const textOut = `The text was: ${textIn}`;
console.log(textOut);

// Записываем результат в файл output.txt
fs.writeFileSync(`${dirPath}/output.txt`, textOut);
