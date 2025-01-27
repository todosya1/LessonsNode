console.log('1 - hello world');
console.log('2 - hello world');
console.log('3 - hello world');

/*
Запуск скриптов:
Используйте npm run script-name для запуска скриптов.
Например, npm start выполнит node app.js.
Установка зависимостей:
Используйте npm install <package-name> для добавления зависимостей.
Например, npm install bcrypt добавит bcrypt в dependencies.
Управление зависимостями:
dependencies для необходимых пакетов в продакшене.
devDependencies для пакетов, используемых только в разработке.
Эти шаги помогут вам настроить и управлять проектом Node.js, используя npm и package.json.

Создание проекта:
Используйте npm init для создания package.json.
Заполните поля, такие как name, version, description, main, scripts, keywords, author, и license.

npm install bcrypt cors mongodb добавит эти пакеты в dependencies.

Nodemon:
Nodemon автоматически перезапускает приложение Node.js при изменении файлов.
Установите глобально с помощью 
npm install -g nodemon
Добавьте в scripts в package.json для автоматического запуска:
*/

/*
Создайте файл index.js:
Напишите простой код, например:
javascript
CopyInsert
console.log("Hello, World!");
Настройте package.json:
Убедитесь, что Nodemon установлен и добавлен в скрипты:
json
CopyInsert
"scripts": {
  "start": "nodemon index.js"
}
Запустите сервер:
Используйте команду npm start.
Сервер запустится и будет выводить "Hello, World!".
Измените код:
Измените вывод на, например, "Hello from nodemon!".
Nodemon автоматически перезапустит сервер и отобразит новое сообщение.
Это позволяет вам быстро видеть изменения без необходимости вручную перезапускать сервер.

*/