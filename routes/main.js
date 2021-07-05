const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main-controller');

router.get('/', mainController.index);
router.get('/contact', mainController.contact);
router.get('/about', mainController.aboutUs);

module.exports = router;