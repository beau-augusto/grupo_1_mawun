const express = require('express');
const router = express.Router();
const { body } = require('express-validation');
const mainController = require('../controllers/main-controller');

router.get('/', mainController.index);
router.get('/contacto', mainController.contact);
router.get('/nosotros', mainController.aboutUs);

/** Newsletter*/
router.post('/', validationNewsletter, mainController.newsletterStore);

module.exports = router;