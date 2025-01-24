// Проверьте файл output.txt. Он должен содержать исходный текст из input.txt с добавленной строкой "Добавлен новый контент!".
// Пример асинхронного кода для выполнения задачи:
// Импорт модуля fs
const fs = require('fs');

// Чтение содержимого файла input.txt
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }

    console.log('Содержимое input.txt:', data);

    // Добавление строки "Processed by Node.js" к содержимому
    const modifiedData = `${data}\nProcessed by Node.js`;

    // Запись модифицированного содержимого в output.txt
    fs.writeFile('output.txt', modifiedData, (err) => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            return;
        }

        console.log('Модифицированные данные успешно записаны в output.txt');
    });
});
