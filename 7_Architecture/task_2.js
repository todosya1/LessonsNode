// Демонстрация работы с асинхронными операциями и блокирующим кодом

// Первая функция - простой вывод в консоль
function first() {
    console.log('First function');
}

// Асинхронная операция с таймером на 2 секунды
setTimeout(function() {
    console.log('setTimeout: 2 sec');
}, 2000);

// Функция, которая содержит тяжелые вычисления и блокирует поток
function longTaskFunc() {
    // Эта функция содержит операции, которые занимают длительное время
    for (let i = 0; i < 1e9; i++) { }
    // Несколько циклов для демонстрации длительной операции
    // for (let i = 0; i < 1e9; i++) { }
    // for (let i = 0; i < 1e9; i++) { }
    // for (let i = 0; i < 1e9; i++) { }
    // for (let i = 0; i < 1e9; i++) { }
    // for (let i = 0; i < 1e9; i++) { }
    console.log('Long Task Function');
}

// Вторая функция - простой вывод в консоль
function second() {
    console.log('Second function');
}

// Вызов всех функций
first();         // 1. Выполнится первой
longTaskFunc();  // 2. Выполнится второй и заблокирует поток на некоторое время
second();        // 3. Выполнится третьей
// setTimeout выполнится последним, даже если 2 секунды уже прошли,
// потому что сначала должен освободиться Call Stack

/* Порядок вывода будет:
1. "First function"
2. "Long Task Function" (после значительной задержки)
3. "Second function"
4. "setTimeout: 2 sec" (после всех синхронных операций)

Важно! setTimeout сработает не ровно через 2 секунды, а только после того,
как освободится Call Stack от всех синхронных операций
*/