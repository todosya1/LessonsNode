/*
Задача №1:
Создать новый проект. Добавить папку text в проект.
В папке text создать файл input.txt с содержимым: this text is in input text file.
Программа должна прочитать текст из файла input.txt, обработать его и записать результат в файл output.txt.

Задача с JSON:
Создать новую папку json в проекте. Добавить файл input.json с содержимым: {"name":"Tania","age":20}.
Прочитать содержимое файла, преобразовать в строку JSON и объект, а затем сохранить результат в новый файл output3.json.
*/

const http = require('http'); // Импорт модуля HTTP
const fs = require('fs'); // Импорт модуля файловой системы
const path = require('path'); // Импорт модуля работы с путями

// Определяем путь к папке text
const dirPath = path.join(__dirname, '/text');

// Чтение текста из файла input.txt
const textIn = fs.readFileSync(`${dirPath}/input.txt`, 'utf-8');

// Обработка текста
const textOut = `the text was: ${textIn}`;

// Запись обработанного текста в файл output.txt
fs.writeFileSync(`${dirPath}/output.txt`, textOut);

console.log(textOut); // Вывод результата в консоль


// Чтение JSON из файла input.json
const fileData = fs.readFileSync(`${__dirname}/json/input.json`);

// Преобразование буфера данных в строку JSON
const fileJSON = fileData.toString();
console.log(typeof fileJSON); // Проверка типа данных (string)
console.log(fileJSON); // Вывод JSON строки

// Запись JSON строки в файл output3.json
fs.writeFileSync(`${__dirname}/json/output3.json`, fileJSON);

// Преобразование строки JSON в объект
const fileObj = JSON.parse(fileJSON);
console.log(fileObj); // Вывод объекта в консоль