const express = require('express');
const app = express();
const { products } = require('./data');
const port = 3008;

// Middleware для работы с JSON
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
    res.send('<h1>Главная страница</h1><a href="/api/products">Посмотреть все продукты</a>');
});

// Получить все продукты
app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image, price } = product;
        return { id, name, image, price };
    });
    res.json(newProducts);
});

// Получить продукт по ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));

    if (!product) {
        return res.status(404).json({ success: false, message: 'Товар не найден' });
    }

    return res.json(product);
});

// Фильтрация продуктов по цене
app.get('/products/:productPrice', (req, res) => {
    const price = parseFloat(req.params.productPrice);
    
    if (isNaN(price)) {
        return res.status(400).json({ success: false, message: 'Некорректная цена' });
    }

    const filteredProducts = products.filter(product => product.price <= price);

    if (filteredProducts.length === 0) {
        return res.status(404).json({ 
            success: false, 
            message: `Товары дешевле ${price} не найдены` 
        });
    }

    res.json({
        success: true,
        data: filteredProducts
    });
});

app.listen(port, () => {
    console.log('\nСервер запущен! Доступные эндпоинты:');
    console.log(`\n1. Все продукты:\n   http://localhost:${port}/api/products`);
    console.log(`\n2. Продукт по ID (пример для ID=1):\n   http://localhost:${port}/api/products/1`);
    console.log(`\n3. Фильтр по цене (пример: товары дешевле 30):\n   http://localhost:${port}/products/30`);
});

/*
Анализ кода:
1. Реализованы следующие эндпоинты:
   - GET /api/products - получение списка всех продуктов
   - GET /api/products/:id - получение продукта по ID
   - GET /products/:productPrice - фильтрация продуктов по максимальной цене

2. Особенности реализации:
   - Данные загружаются из отдельного файла data.js
   - При выводе всех продуктов отображаются только основные поля (id, name, image, price)
   - Реализована обработка ошибок (некорректная цена, товар не найден)
   - Для фильтрации по цене используется параметр в URL
   - В консоли выводятся кликабельные ссылки для тестирования API
*/