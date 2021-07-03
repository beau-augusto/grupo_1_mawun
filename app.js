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
app.use ('/users', usersRouter);

const productsRouter = require('./routes/products');
app.use ('/products', productsRouter);

app.get('/detalle-producto.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/detalle-producto.html'));
});

app.get('/carrito.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));
});

/* app.get('/abm-productos.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/abm-productos.html'));
});

app.get('/login', (req, res) => {
    res.render(path.resolve(__dirname, './views/login'));
});

app.get('/register', (req, res) => {
    res.render(path.resolve(__dirname, './views/register'));
}); */


