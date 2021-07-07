//***** Requeridos *****//
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

//***** Express *****//
const app = express();

//***** Template Engine *****//
app.set('view engine', 'ejs');


//***** Middlewares *****//
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//***** Get port from environment *****//
const port = process.env.PORT || 3000;
app.listen(port);


/* app.listen(3000, () => {
    console.log("servidor corriendo en el puerto 3000");
}); */

//***** Route System  *****//
const mainRouter = require('./routes/main'); // Rutas main
const usersRouter = require('./routes/users'); // Rutas /usuarios
const productsRouter = require('./routes/products'); // Rutas /products

app.use ('/', mainRouter);
app.use ('/usuarios', usersRouter);
app.use ('/productos', productsRouter);
