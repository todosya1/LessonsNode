
/*
Задание #8:

Напишите программу на Node.js, которая выполняет следующие действия:

Считывает содержимое файла users.json, содержащего имена пользователей.
Считает количество пользователей.
Объединяет все имена пользователей в один список.
Записывает количество пользователей в файл user_count.txt.
Записывает список всех имен пользователей в файл user_names.txt.
*/
const fs = require('fs');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'users.json');

// Reading the contents of the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parsing JSON data into an object
    const users = JSON.parse(data);

    // Counting the number of users
    const userCount = users.length;

    // Getting the list of user names
    const userNames = users.map(user => user.name);

    // Writing the number of users to user_count.txt
    const countFilePath = path.join(__dirname, 'user_count.txt');
    fs.writeFile(countFilePath, `Number of users: ${userCount}`, (err) => {
        if (err) {
            console.error('Error writing to user_count.txt:', err);
            return;
        }
        console.log('Number of users written to user_count.txt');
    });

    // Writing user names to user_names.txt
    const namesFilePath = path.join(__dirname, 'user_names.txt');
    fs.writeFile(namesFilePath, `User names:\n${userNames.join('\n')}`, (err) => {
        if (err) {
            console.error('Error writing to user_names.txt:', err);
            return;
        }
        console.log('User names written to user_names.txt');
    });
});