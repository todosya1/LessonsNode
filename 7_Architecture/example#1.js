// Пример #1: Синхронный вызов функций
// В синхронном коде каждая операция выполняется последовательно, одна за другой
// Функция printHi принимает параметр name и выводит приветствие
function printHi(name){
    console.log(`Hi, ${name}`)
}
// Все три вызова выполнятся последовательно, в порядке объявления
const first = printHi("Dan")    // Выполнится первым
const second = printHi("Kate")  // Выполнится вторым
const third = printHi("Ben")    // Выполнится третьим

// Пример #2: Вложенные функции
// Демонстрация как одна функция может вызывать другую
function greet() {
    console.log("Hello");
    askHowAreYou();  // Вызов второй функции внутри первой
}
  
function askHowAreYou() {
    console.log("How are you?");
}
  
greet();  // При вызове greet() сначала выведется "Hello", затем "How are you?"

// Пример #3: Асинхронный код с использованием setTimeout
// Демонстрация неблокирующего асинхронного выполнения
console.log("Start");  // Выполнится первым

// setTimeout запланирует выполнение функции через 1000 мс (1 секунду)
// Код не будет ждать окончания таймера и продолжит выполнение
setTimeout(() => {
    console.log("Hello from setTimeout");  // Выполнится последним, через 1 секунду
}, 1000);

console.log("End");  // Выполнится вторым, не дожидаясь setTimeout
