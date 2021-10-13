const express = require('express');
const router = express.Router();


const APIController = require('../../controllers/apis/APIController');


router.get('/orders', APIController.orders);
router.get('/addresses', APIController.addresses);

module.exports = router;