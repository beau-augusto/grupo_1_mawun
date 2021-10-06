const express = require('express');
const router = express.Router();
const loggedoutRedirect = require("../middlewares/loggedoutRedirect.js");

const productsController = require('../controllers/products-controller');

router.get('/', productsController.list);
router.get('/detalle/:id?', productsController.detail);
router.get('/carrito', loggedoutRedirect, productsController.cart);
router.post('/carrito/:id', loggedoutRedirect, productsController.addToCart); // agrega 

module.exports = router;