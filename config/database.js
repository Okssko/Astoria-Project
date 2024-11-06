const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         // MySQL username
    password: '',         // MySQL password (if any, replace with your password)
    database: 'astoriya_db'  // Your database name
});

module.exports = pool.promise();
