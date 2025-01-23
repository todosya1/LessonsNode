console.log(__dirname); // Выводит путь к текущей директории
console.log(__filename); // Выводит полный путь к текущему файлу
// console.log(module); // Выводит объект модуля (закомментировано)

// Выводит "hello world" каждую секунду
setInterval(() => {
    console.log('hello world');
}, 1000);
