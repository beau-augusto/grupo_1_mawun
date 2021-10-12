const express = require('express');
const router = express.Router();


const ordersAPIController = require('../../controllers/apis/ordersAPIController');


router.use('/', ordersAPIController.list);

module.exports = router;