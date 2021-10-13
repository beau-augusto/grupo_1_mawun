const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const mainController = require('../controllers/main-controller');
const validateNewsletter = require("../middlewares/validateNewsletter.js");

router.get('/', mainController.index);
router.get('/contacto', mainController.contact);
router.get('/nosotros', mainController.aboutUs);


/** Newsletter*/
router.post('/', validateNewsletter, mainController.newsletterCreate);


module.exports = router;