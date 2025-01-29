const express = require('express');
const router = express.Router();
const data = require('../data');

// GET /api/products - получить все продукты
router.get('/', (req, res) => {
    res.json({ products: data.products });
});

// GET /api/products/:id - получить продукт по id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = data.products.find(item => item.id === parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: `Товар с ID ${id} не найден` });
    }
});

// POST /api/products - добавить новый продукт
router.post('/', (req, res) => {
    const productData = req.body;
    
    // Проверка обязательных полей
    if (!productData.price || typeof productData.price !== 'number' || productData.price <= 0) {
        return res.status(400).json({ message: 'Цена должна быть положительным числом' });
    }
    
    if (!productData.stock || typeof productData.stock !== 'number' || !Number.isInteger(productData.stock)) {
        return res.status(400).json({ message: 'Количество товара должно быть целым числом' });
    }
    
    data.products.push(productData);
    res.json({ message: 'Товар успешно добавлен', products: data.products });
});

// PUT /api/products/:id - обновить существующий продукт
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    
    // Проверка обязательных полей
    if (productData.price !== undefined && (typeof productData.price !== 'number' || productData.price <= 0)) {
        return res.status(400).json({ message: 'Цена должна быть положительным числом' });
    }
    
    if (productData.stock !== undefined && (typeof productData.stock !== 'number' || !Number.isInteger(productData.stock))) {
        return res.status(400).json({ message: 'Количество товара должно быть целым числом' });
    }
    
    const productIndex = data.products.findIndex(item => item.id === parseInt(id));
    
    if (productIndex !== -1) {
        data.products[productIndex] = { ...data.products[productIndex], ...productData };
        res.json({ message: `Товар с ID ${id} успешно обновлен`, products: data.products });
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

// DELETE /api/products/:id - удалить продукт
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = data.products.findIndex(item => item.id === parseInt(id));
    
    if (productIndex !== -1) {
        data.products.splice(productIndex, 1);
        res.json({ message: `Товар с ID ${id} успешно удален`, products: data.products });
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

module.exports = router;