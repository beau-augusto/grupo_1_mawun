//***** Requeridos *****//
const express = require('express');
const path = require('path');

//***** Express *****//
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

app.listen(3000, () => {
    console.log("servidor corriendo en el puerto 3000");
});

const mainRouter = require('./routes/main');
app.use ('/', mainRouter);

const usersRouter = require('./routes/users');
app.use ('/usuarios', usersRouter);

const productsRouter = require('./routes/products');
app.use ('/productos', productsRouter);