//***** Requeridos *****//
const express = require('express');
const path = require('path');

//***** Express *****//
const app = express();

/* const publicPath = path.resolve(__dirname, './public' );
app.use( express.static(publicPath) ); */

app.use(express.static(path.join(__dirname, './public')));

app.listen(3000, () => {
    console.log("servidor corriendo en el puerto 3000");
});

const mainRouter = require('./routes/main');
app.use ('/', mainRouter);

app.get('/detalle-producto.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/detalle-producto.html'));
});

app.get('/carrito.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/abm-productos.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/abm-productos.html'));
});

