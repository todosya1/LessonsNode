// Импортируем необходимые модули
const express = require('express');
const router = express.Router();
const dbSingleton = require('../database/dbSingleton');

// Получаем подключение к базе данных
const db = dbSingleton.getConnection();

// CREATE - Создание нового продукта
router.post('/', (req, res) => {
    const { name, price } = req.body;
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.query(query, [name, price], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Product added!', id: results.insertId });
    });
});

// READ - Получение всех продуктов с опциональным лимитом
router.get('/', (req, res, next) => {
    try{
        const limit = req.query.limit;

        // Проверяем, является ли лимит числом в запросе
        if (limit && isNaN(limit)){
            return res.status(400).json({error: 'Parameter "limit" must be a number'});
        }

        // Главная Логика
        const query = limit
            ? 'SELECT * FROM products LIMIT ?'
            : 'SELECT * FROM products';
        
        // Преобразуем limit в число или используем пустой массив для параметров
        const params = limit ? [parseInt(limit, 10)] : [];
       
        db.query(query, params, (err, results) => {
            if (err) {
                return next(err);
            }
            res.json(results);
        });
    } catch (error) {
        // Pass synchronous errors to the error handler
        next(error);
    }
});       
 

// READ - Получение продукта по ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(results[0]);
    });
});

// UPDATE - Обновление продукта
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.query(query, [name, price, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Product updated!' });
    });
});

// DELETE - Удаление продукта
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Product deleted!' });
    });
});

module.exports = router;