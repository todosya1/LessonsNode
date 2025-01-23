// Определяем две функции
const hello = function () {
    console.log('Say Hello!');
};

const buy = function () {
    console.log('Say Buy!');
};

// Экспортируем обе функции как свойства объекта
module.exports = {
    hello,
    buy,
};
