const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Импортируем данные
const { products } = require('./data');

// Middleware для обработки JSON
app.use(express.json());

// Главная страница со ссылкой на API
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

// 1. Получить все продукты
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

// 2. Получить продукт по ID
app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);
    
    if (!product) {
        return res.status(404).json({ success: false, message: `Product with id ${id} not found` });
    }
    
    res.status(200).json(product);
});

// 3. Получить продукты из определенного города
app.get('/api/products/city/:city', (req, res) => {
    const city = req.params.city;
    const filteredProducts = products.filter(product => 
        product.city.toLowerCase() === city.toLowerCase()
    );
    
    if (filteredProducts.length === 0) {
        return res.status(404).json({ 
            success: false, 
            message: `No products found in ${city}` 
        });
    }
    
    res.status(200).json(filteredProducts);
});

// 4. Получить продукты с отзывами
app.get('/api/products/reviews/all', (req, res) => {
    const productsWithReviews = products.filter(product => product.review);
    
    if (productsWithReviews.length === 0) {
        return res.status(404).json({ 
            success: false, 
            message: 'No products with reviews found' 
        });
    }
    
    res.status(200).json(productsWithReviews);
});

// 5. Получить продукты в заданном ценовом диапазоне
app.get('/api/products/price/range', (req, res) => {
    const { min, max } = req.query;
    
    if (!min || !max) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide both min and max price values' 
        });
    }
    
    const filteredProducts = products.filter(product => 
        product.price >= Number(min) && product.price <= Number(max)
    );
    
    if (filteredProducts.length === 0) {
        return res.status(404).json({ 
            success: false, 
            message: `No products found in price range ${min}-${max}` 
        });
    }
    
    res.status(200).json(filteredProducts);
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`
Доступные маршруты:
1. GET http://localhost:${port}/api/products - получить все продукты
2. GET http://localhost:${port}/api/products/2 - получить продукт с ID=2
3. GET http://localhost:${port}/api/products/city/albany - получить продукты из Albany
4. GET http://localhost:${port}/api/products/reviews/all - получить продукты с отзывами
5. GET http://localhost:${port}/api/products/price/range?min=50&max=1000 - получить продукты в ценовом диапазоне
`);
});
