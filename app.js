require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect()

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  connection.query('SELECT * FROM agenda', (error, results, fields) => {
    if (error) throw error;
    res.render('index', { data: results });
  });
});

 



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
