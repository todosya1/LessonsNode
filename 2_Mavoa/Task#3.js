// чтобы запустить пропиши в терминале node Task#3.js

// Исходный массив чисел
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Функция для вычисления количества четных чисел
const countEvenNumbers = numbers.reduce((count, num) => count + (num % 2 === 0 ? 1 : 0), 0);

// Вывод результата
console.log(`Количество четных чисел: ${countEvenNumbers}`);