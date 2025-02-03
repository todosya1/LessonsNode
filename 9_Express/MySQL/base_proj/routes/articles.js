const express = require('express');
const router = express.Router();
const dbSingleton = require('../database/dbSingleton');
const db = dbSingleton.getConnection();

// Добавление новой статьи
router.post('/', (req, res) => {
    const { title, content, author } = req.body;
    const query = 'INSERT INTO articles (title, content, author) VALUES (?, ?, ?)';
    
    db.query(query, [title, content, author], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Article added!', id: results.insertId });
    });
});

// Получение всех статей
router.get('/', (req, res) => {
    const query = 'SELECT * FROM articles';
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Получение статьи по ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM articles WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Article not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Удаление статьи по ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM articles WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Article deleted!' });
    });
});

// Получение статей по автору
router.get('/author/:name', (req, res) => {
    const { name } = req.params;
    const query = 'SELECT * FROM articles WHERE author = ?';
    
    db.query(query, [name], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

module.exports = router;