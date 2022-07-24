const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "recipes_db",
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("CONNECTED TO SQL");
});


module.exports = db;