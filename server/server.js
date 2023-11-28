const express = require('express');
const mysql = require('mysql2');



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    insecureAuth: true 
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected');
})


const app = express();

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS server';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        if (result.warningCount === 0) {
            console.log('Database created or already exists');
        } else {
            console.log('Database creation skipped (already exists)');
        }
        res.send('Starting...');
    });
});
app.listen('8000', () => {
    console.log("Server started on port 8000")
});

