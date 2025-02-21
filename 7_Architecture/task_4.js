// Демонстрация работы Task Queue и Event Loop с несколькими таймерами

// Первая функция - синхронная операция
function first() {
    console.log('First function');
}

// Вторая функция - таймер на 1 секунду
function second() {
    setTimeout(() => {
        console.log('setTimeout: 1 sec');
    }, 1000);
}

// Третья функция - таймер на 0 секунд
function third() {
    setTimeout(() => {
        console.log('setTimeout: 0 sec');
    }, 0);
}

// Четвертая функция - таймер на 2 секунды
function fourth() {
    setTimeout(() => {
        console.log('setTimeout: 2 sec');
    }, 2000);
}

// Вызов всех функций
first();   // Выполнится первой (синхронно)
second();  // Регистрирует таймер на 1 секунду
third();   // Регистрирует таймер на 0 секунд
fourth();  // Регистрирует таймер на 2 секунды
console.log('End of synchronous code');

/* Порядок вывода будет:
1. "First function"           // Синхронный код выполняется немедленно
2. "End of synchronous code"  // Синхронный код выполняется немедленно
3. "setTimeout: 0 sec"        // Попадает в очередь первым, но ждет завершения синхронного кода
4. "setTimeout: 1 sec"        // Выполнится через 1 секунду
5. "setTimeout: 2 sec"        // Выполнится через 2 секунды

Важно! Task Queue - это очередь задач, которая содержит асинхронные операции.
Event Loop проверяет эту очередь и выполняет задачи только после того,
как весь синхронный код завершил выполнение.
Даже setTimeout с задержкой 0мс выполнится только после всего синхронного кода.
*/