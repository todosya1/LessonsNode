// Импортируем необходимые модули
const express = require('express');
const router = express.Router();
const dbSingleton = require('../dbSingleton');


// ... здесь будет код для работы с базой данных ...

// Exxecute a query to the database
const db = dbSingleton.getConnection();
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});


//User update
router.put(':id', (req, res) =>{
    const {id } = req.params;
    const { name, email, password } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [name, email, password, id], (err, results) =>{
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({message: 'User updated'});
    });
}  )

// Экспортируем роутер для использования в основном приложении
module.exports = router; 