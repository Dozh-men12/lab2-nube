/* CONEXION A PLANETSCALE */
require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);
/* TERMINA LA CONEXION A PLANET SCALE */

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));


 
connection.connect()

app.set('view engine', 'ejs');

//READ
app.get('/', (req, res) => {
  connection.query('SELECT * FROM productos', (error, results, fields) => {
    if (error) throw error;
    res.render('index', { data: results });
  });
});

//Create
app.get('/add', (req, res) => {
  res.render('Crear')
});

app.post('/save', (req, res) => {
  const nombre = req.body.nombre;
  const autor = req.body.autor;
  const precio = req.body.precio;
  const imagen = req.body.imagen;
  connection.query('INSERT INTO productos SET ?',{nombre:nombre, autor:autor, precio:precio,imagen: imagenURL}, (error, results)=>{
    if(error){
        console.log(error);
    }else{      
      res.redirect('/');  
      console.log(`Libro ${nombre} creado`);
    }         
  });
});

//UPDATE
app.get('/up/:id', (req, res) =>  {
  const id = req.params.id;
  connection.query('SELECT * FROM productos WHERE id = ?', [id], (error, results, fields) => {
    if (error) throw error;
    res.render('editar.ejs', { data: results[0] });
  });
});

app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const autor = req.body.autor;
  const precio = req.body.precio;
  connection.query('UPDATE productos SET nombre = ?, autor = ?, precio = ? WHERE id = ?', [nombre, autor, precio, id], (error, results) => {
    if (error) throw error;
    res.redirect('/');
  });
});

//DELETE
app.get('/delete/:id', (req,res) => {
  const id = req.params.id
  connection.query('DELETE FROM productos WHERE id = ?',[id],(error, results) => {
    if (error) throw error;
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
