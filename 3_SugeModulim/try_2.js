/* На изображении приведён пример использования стороннего модуля mathjs в Node.js. Вот подробное объяснение, как работать с этим примером:
Шаги:
1. Инициализация проекта
Создайте package.json для управления зависимостями. флаг -y создаёт файл package.json с настройками по умолчанию.:
npm init -y
Установите библиотеку mathjs: Это добавит mathjs в список зависимостей в вашем package.json и создаст папку node_modules.
npm install mathjs

node try_2.js


*/
const math = require('mathjs'); // Подключаем модуль mathjs

// Пример использования математических функций
const a = 3;
const b = 4;

const sum = math.add(a, b);
const product = math.multiply(a, b);
const power = math.pow(a, b);
const sqrt = math.sqrt(b);

console.log(`Sum of ${a} and ${b} is:`, sum);
console.log(`Product of ${a} and ${b} is:`, product);
console.log(`${a} raised to the power of ${b} is:`, power);
console.log(`Square root of ${b} is:`, sqrt);