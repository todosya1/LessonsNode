// cd task#5          node app.js 
// Этот пример демонстрирует использование модуля path в Node.js для работы с путями. Вот объяснение и инструкция:

const path = require('path'); // Подключаем модуль path

// Разделитель путей
console.log(path.sep);

// Создаём путь к файлу с использованием join
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath); // Выводит: content\subfolder\test.txt (на Windows)

// Получаем имя файла из пути
const base = path.basename(filePath);
console.log(base); // Выводит: test.txt

// Создаём абсолютный путь к файлу
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute); // Выводит полный путь, например: C:\project\content\subfolder\test.txt

/*
Объяснение:
path.sep:

Возвращает символ разделителя путей, который зависит от ОС.
Например:
На Windows: \
На Unix-подобных системах: /
path.join([...segments]):

Объединяет сегменты пути в один строковый путь.
Удобен для создания относительных путей.
path.basename(path):

Возвращает имя файла или папки из указанного пути.
Например:
Для пути content/subfolder/test.txt результатом будет test.txt.
path.resolve([...segments]):

Создаёт абсолютный путь, начиная с текущей директории (__dirname).
Полезно для получения полного пути к файлу, независимо от текущей рабочей директории.
*/