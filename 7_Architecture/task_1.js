// Демонстрация порядка выполнения асинхронного кода

// Первая функция - выполнится синхронно
function first() {
    console.log('First function');
}

// Функция с задержкой в 2 секунды
setTimeout(function() {
    console.log('setTimeout: 2 sec');
}, 2000);

// Вторая функция - тоже выполнится синхронно
function second() {
    console.log('Second function');
}

// Вызов функций
first();   // Выполнится первой
second();  // Выполнится второй
// setTimeout выполнится последним, через 2 секунды после запуска

/* Порядок вывода будет:
1. "First function"
2. "Second function"
3. "setTimeout: 2 sec" (через 2 секунды)
*/