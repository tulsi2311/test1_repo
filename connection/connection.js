const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // database: "authentication_demo"
    database: process.env.DB_DATABASE
 })



conn.connect((err) => {
    {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Database connected`);
        }
    }

})

module.exports = conn;