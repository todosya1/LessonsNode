/*
Задание #7:
Напишите программу, которая читает 3 файла, содержащих списки имен, и создает новый файл в следующем формате:
Строка из первого файла:
строка из второго файла
строка из третьего файла
Строка из первого файла:
строка из второго файла
строка из третьего файла
Если один из файлов короче, то пропускаем копирование строк из остальных файлов.
*/


const fs = require('fs');
const path = require('path');

// Path to the directory containing the files
const dirPath = path.join(__dirname, 'text');

// Function to repeat lines
const repeatLines = (lines, repeatCount) => {
    let result = [];
    lines.forEach((line) => {
        for (let i = 0; i < repeatCount; i++) {
            result.push(line);
        }
    });
    return result.join('\n');
};

// Main function
const processFiles = async () => {
    try {
        // Reading the contents of all three files
        const firstFile = fs.readFileSync(path.join(dirPath, 'file1.txt'), 'utf8').split('\n');
        const secondFile = fs.readFileSync(path.join(dirPath, 'file2.txt'), 'utf8').split('\n');
        const thirdFile = fs.readFileSync(path.join(dirPath, 'file3.txt'), 'utf8').split('\n');

        // Repeating lines
        const result = [];
        result.push(repeatLines(firstFile, 1));
        result.push(repeatLines(secondFile, 2));
        result.push(repeatLines(thirdFile, 3));

        // Writing the result to a new file
        fs.writeFileSync(path.join(dirPath, 'output.txt'), result.join('\n\n'));
        console.log('File successfully created: output.txt');
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Run the function
processFiles();