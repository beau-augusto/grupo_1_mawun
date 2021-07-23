//***** Requeridos *****//
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

//***** Express *****//
const app = express();

//***** Template Engine *****//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


//***** Middlewares *****//
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//***** Route System  *****//
const mainRouter = require('./routes/main'); // Rutas main
const usersRouter = require('./routes/users'); // Rutas /usuarios
const productsRouter = require('./routes/products'); // Rutas /products
const adminRouter = require ('./routes/admin'); // Rutas Admin Back Office

app.use ('/', mainRouter);
app.use ('/usuarios', usersRouter);
app.use ('/productos', productsRouter);
app.use ('/admin', adminRouter);

//***** Exports app *****//
module.exports = app; // Para poder usar nodemon bin/www 