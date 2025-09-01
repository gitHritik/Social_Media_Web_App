import mysql from "mysql"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hritik123!@#",
    database: "social"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

export default db;
