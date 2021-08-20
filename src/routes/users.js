const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/users-controller');

/** MIDDLEWARES **/
const validateLogin = require("../middlewares/validateLogin.js");

/*** Multer ***/
const multer  = require('multer');
const upload = multer();

/*** CREAR USUSARIO ***/
router.get('/registro', usersController.create); // Imprimir hoja para crear producto
router.post('/', usersController.store);

/*** SESIONES ***/
router.get('/inicio', usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)



module.exports = router;