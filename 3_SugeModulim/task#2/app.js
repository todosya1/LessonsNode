// app.js
const greet = require('./greet'); // Импортируем модуль greet.js
greet(); // Вызываем функцию

// Импортируем модуль
const myModule = require('./myModule');
// Используем функции из модуля
myModule.hello(); // Выведет: Say Hello!
myModule.buy();   // Выведет: Say Buy!

// Выводим содержимое модуля
console.log(myModule);
// Результат: { hello: [Function: hello], buy: [Function: buy] }