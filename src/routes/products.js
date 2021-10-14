const express = require('express');
const router = express.Router();
const loggedoutRedirect = require("../middlewares/loggedoutRedirect.js");

const productsController = require('../controllers/products-controller');

router.get('/', productsController.list);
router.get('/detalle/:id?', productsController.detail);
router.get('/listado-categoria/:category', productsController.categoryList);
router.get('/carrito', loggedoutRedirect, productsController.cart);
router.post('/carrito/:id', loggedoutRedirect, productsController.addToCart);
router.get('/carrito/:id/actualizar', loggedoutRedirect, productsController.updateQuantity)
router.delete('/carrito/:id/delete', loggedoutRedirect, productsController.deleteCart);
router.put('/carrito/:id/continuar', loggedoutRedirect, productsController.continuar);
router.post('/carrito/:id/al-pago', loggedoutRedirect, productsController.alPago);
router.post('/carrito/:id/comprar', loggedoutRedirect, productsController.comprar);


module.exports = router;