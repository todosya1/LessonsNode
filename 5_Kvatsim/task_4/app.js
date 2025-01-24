//Проверьте файл output.txt. Он должен содержать исходный текст из input.txt с добавленной строкой "Добавлен новый контент!".

// Импортируем модуль fs
const fs = require('fs');

// Чтение содержимого файла input.txt
try {
    const data = fs.readFileSync('input.txt', 'utf8'); // Читаем файл синхронно
    console.log('Содержимое input.txt:', data);

    // Преобразование данных (например, добавление строки)
    const modifiedData = `${data}\nДобавлен новый контент!`;

    // Запись модифицированного содержимого в output.txt
    fs.writeFileSync('output.txt', modifiedData); // Записываем файл синхронно
    console.log('Данные записаны в output.txt');
} catch (err) {
    console.error('Ошибка:', err); // Обработка ошибок
}
