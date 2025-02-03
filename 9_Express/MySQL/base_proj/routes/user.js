// Импортируем необходимые модули
const express = require('express'); // Импортируем фреймворк Express
const router = express.Router();    // Создаем новый экземпляр роутера Express для 
const dbSingleton = require('../database/dbSingleton'); // Импортируем наш Singleton для базы данных

// обработки маршрутов пользователя

// ... здесь будет код для работы с базой данных ...

// Execute a query to the database
const db = dbSingleton.getConnection();

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

// CRUD - Adding a new user (C - Create) 
router.post('/', (req, res) =>{                  // Создаем POST-маршрут для добавления нового пользователя ("יוצר נתיב POST להוספת משתמש חדש")
    const { name, email, password } = req.body;  // Извлекаем данные пользователя из тела запроса ("מחלץ את נתוני המשתמש מגוף הבקשה")
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';             // SQL-запрос для вставки нового пользователя
    // Знаки вопроса (?) в SQL-запросе - это параметры, которые защищают от SQL-инъекций, так как значения экранируются автоматически.
    db.query(query, [name, email, password], (err, results) => {                            // Выполняем запрос с параметрами
        if (err){
            res.status(500).send(err);           // Если произошла ошибка, отправляем статус 500
            return;
        }
        res.json({message: 'User added!', id: results.insertId });                          // Отправляем сообщение об успехе и ID нового пользователя
        });
    });

// CRUD - Read all users (R-Read)
router.get('/', (req, res) => {             // Создаем GET-маршрут для корневого пути '/' ("יוצר נתיב GET לנתיב הראשי")
    const query = 'SELECT * FROM users';    // SQL-запрос для выбора всех пользователей из таблицы ("שאילתת SQL לבחירת כל המשתמשים מהטבלה")
    db.query(query, (err, results) => {     // Выполняем запрос к базе данных ("מבצע שאילתה למסד הנתונים")
        if (err) {                          // Если произошла ошибка, отправляем статус 500 и текст ошибки ("אם יש שגיאה, שולח סטטוס 500 וטקסט השגיאה")
            res.status(500).send(err);
            return;
        }
        res.json(results);                  // Отправляем результаты в формате JSON ("שולח את התוצאות בפורמט JSON")
    });
});

// CRUD - User update (U - Update) ("עדכון משתמש")
router.put('/:id', (req, res) =>{                           // Создаем PUT-маршрут для обновления пользователя по ID ("יוצר נתיב PUT לעדכון משתמש לפי מזהה")
    const { id} = req.params;                               // Получаем ID пользователя из параметров маршрута ("מקבל את מזהה המשתמש מפרמטרי הנתיב")
    const { name, email, password } = req.body;             // Получаем новые данные из тела запроса ("מקבל את הנתונים החדשים מגוף הבקשה")
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';    // SQL-запрос для обновления пользователя
    db.query(query, [name, email, password, id], (err, results) =>{                     // Выполняем запрос с параметрами
        if (err) {
            res.status(500).send(err);                      // Если произошла ошибка, отправляем статус 500 
            return;
        }
        res.json({message: 'User updated!'});                // Отправляем сообщение об успешном обновлении  
    });
});


// CRUD - Deleting a user (D - Delete)
router.delete('/:id', (req, res) =>{                    // Создаем DELETE-маршрут для удаления пользователя
    const { id } = req.params;                          // Получаем ID пользователя из параметров
    const query = 'DELETE FROM users WHERE id = ?';     // SQL-запрос для удаления пользователя
    db.query(query, [id], (err, results) => {           // Выполняем запрос с параметром ID
        if (err) {
            res.status(500).send(err);                      // Если произошла ошибка, отправляем статус 500 
            return;
        }
        res.json({message: 'User deleted!'});                // Отправляем сообщение об успешном удалении  
    })


})







// Экспортируем роутер для использования в основном приложении
module.exports = router; 