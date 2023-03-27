const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    // database: "authentication_demo"
    database: "2023_Elite"
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