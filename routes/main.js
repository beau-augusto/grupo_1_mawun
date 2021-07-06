const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main-controller');

router.get('/', mainController.index);
router.get('/contacto', mainController.contact);
router.get('/nosotros', mainController.aboutUs);

module.exports = router;