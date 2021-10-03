const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products-controller');

router.get('/', productsController.list);
router.get('/detalle/:id?', productsController.detail);
router.get('/carrito', productsController.cart);
router.post('/carrito/:id', productsController.addToCart); // agrega 

module.exports = router;