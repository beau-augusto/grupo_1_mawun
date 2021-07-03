const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products-controller');

router.get('/', productsController.list);
router.get('/abm', productsController.abm);
router.get('/detail', productsController.detail);

module.exports = router;