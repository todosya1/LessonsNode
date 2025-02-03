//dbSingleton.js 
const mysql = require('mysql2');

let connection; // Variable for storing a single connection

const dbSingleton = {
    getConnection: () => {
        if (!connection) {
            // Create a connection only once
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'shop_db',
            });

            // Подключаемся к базе данных
            connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to database:', err);
                    throw err;
                }
                console.log('Connected to MySQL!');
            });
        }
        return connection;
    }
};

module.exports = dbSingleton;