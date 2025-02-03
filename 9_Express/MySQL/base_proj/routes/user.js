// routes/user.js
const express = require('express');
const router = express.Router(); // Создаем новый экземпляр роутера Express для обработки маршрутов пользователя
const dbSingleton = require('../database/dbSingleton');
const bcrypt = require('bcrypt'); // Импортируем bcrypt для хэширования паролей

const db = dbSingleton.getConnection(); // Execute a query to the database

// READ - Получение пользователя по ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?'; 
    
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.json(results[0]);
    });
});

// Создание пользователя
// CRUD - Adding a new user (C - Create) 
router.post('/', (req, res) =>{                  // Создаем POST-маршрут для добавления нового пользователя ("יוצר נתיב POST להוספת משתמש חדש")
    const { name, email, password } = req.body;  // Извлекаем данные пользователя из тела запроса ("מחלץ את נתוני המשתמש מגוף הבקשה")
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';  // SQL-запрос для вставки данных ("שאילתת SQL להוספת הנתונים")
    // Выполняем запрос с параметрами ("מבצע את השאילתה עם הפרמטרים")
    db.query(query, [name, email, password], (err, results) => {  
        if (err) {
            res.status(500).send(err);  // В случае ошибки отправляем статус 500 ("במקרה של שגיאה שולח סטטוס 500")
            return;
        }
        res.json({ message: 'User added!', id: results.insertId });  // Отправляем успешный ответ ("שולח תשובה מוצלחת")
    });
});

// CRUD - Getting all users (R - Read)
router.get('/', (req, res) => {                 // Создаем GET-маршрут для получения всех пользователей ("יוצר נתיב GET לקבלת כל המשתמשים")
    const query = 'SELECT * FROM users';        // SQL-запрос для выборки всех пользователей ("שאילתת SQL לבחירת כל המשתמשים")
    
    db.query(query, (err, results) => {         // Выполняем запрос ("מבצע את השאילתה")
        if (err) {
            res.status(500).send(err);          // В случае ошибки отправляем статус 500 ("במקרה של שגיאה שולח סטטוס 500")
            return;
        }
        res.json(results);                      // Отправляем результаты ("שולח את התוצאות")
    });
});

// CRUD - Updating a user (U - Update)
router.put('/:id', (req, res) => {             // Создаем PUT-маршрут для обновления пользователя ("יוצר נתיב PUT לעדכון משתמש")
    const { id } = req.params;                 // Получаем ID из параметров маршрута ("מקבל ID מפרמטרי הנתיב")
    const { name, email, password } = req.body; // Получаем новые данные из тела запроса ("מקבל נתונים חדשים מגוף הבקשה")
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'; // SQL-запрос для обновления ("שאילתת SQL לעדכון")
    db.query(query, [name, email, password, id], (err, results) => { // Выполняем запрос с параметрами ("מבצע את השאילתה עם הפרמטרים")
        if (err) {
            res.status(500).send(err);         // В случае ошибки отправляем статус 500 ("במקרה של שגיאה שולח סטטוס 500")
            return;
        }
        res.json({ message: 'User updated!' }); // Отправляем сообщение об успехе ("שולח הודעת הצלחה")
    });
});

// CRUD - Deleting a user (D - Delete)
router.delete('/:id', (req, res) => {          // Создаем DELETE-маршрут для удаления пользователя ("יוצר נתיב DELETE למחיקת משתמש")
    const { id } = req.params;                 // Получаем ID из параметров маршрута ("מקבל ID מפרמטרי הנתיב")
    
    const query = 'DELETE FROM users WHERE id = ?'; // SQL-запрос для удаления ("שאילתת SQL למחיקה")
    
    db.query(query, [id], (err, results) => {  // Выполняем запрос с параметром ID ("מבצע את השאילתה עם פרמטר ID")
        if (err) {
            res.status(500).send(err);         // В случае ошибки отправляем статус 500 ("במקרה של שגיאה שולח סטטוס 500")
            return;
        }
        res.json({ message: 'User deleted!' }); // Отправляем сообщение об успехе ("שולח הודעת הצלחה")
    });
});

module.exports = router;