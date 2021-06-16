const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public' );
app.use( express.static(publicPath) );

app.listen(3000, () => {
    console.log("servidor corriendo en el puerto 3000");
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});
<<<<<<< HEAD
=======

app.post('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/detalle-producto.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/detalle-producto.html'));
});

app.get('/carrito.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));
});
>>>>>>> 08f50be73a7cde7df94152a052b7c73a494cb2b0
