const fs = require('fs');
const path = require('path');

// Путь к входному и выходному файлам
const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'output.txt');

try {
    // Чтение входного файла
    const inputData = fs.readFileSync(inputFilePath, 'utf-8');

    // Разделение файла на строки
    const lines = inputData.split('\n');

    // Ограничение до 10 строк
    const limitedLines = lines.slice(0, 10);

    // Запись ограниченного количества строк в новый файл
    fs.writeFileSync(outputFilePath, limitedLines.join('\n'));

    console.log('Файл успешно обработан и записан в output.txt');
} catch (error) {
    console.error('Ошибка при обработке файла:', error.message);
}
