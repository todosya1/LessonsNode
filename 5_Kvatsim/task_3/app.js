/*
Этот код демонстрирует использование async/await для асинхронной работы с файлами. Вот что происходит:
*/
const { readFile, writeFile } = require('fs').promises; // Импорт методов для работы с файлами с поддержкой промисов
console.log('start'); // Лог для обозначения начала работы

const path = require('path'); // Импорт модуля для работы с путями
const dirPath = path.join(__dirname, '/text'); // Создание пути к папке "text"

const start = async () => {
    try {
        const first = await readFile(`${dirPath}/first.txt`, 'utf8'); // Чтение первого файла
        const second = await readFile(`${dirPath}/second.txt`, 'utf8'); // Чтение второго файла
        await writeFile( // Запись результата в новый файл
            `${dirPath}/result.txt`, 
            `THIS IS AWESOME : ${first} ${second}`, 
            { flag: 'a' } // Флаг 'a' для добавления данных в конец файла
        );
        console.log(first, second); // Лог содержимого прочитанных файлов
    } catch (error) {
        console.log(error); // Лог ошибок
    }
};

start(); // Вызов асинхронной функции
console.log('code end'); // Лог для обозначения завершения выполнения скрипта
