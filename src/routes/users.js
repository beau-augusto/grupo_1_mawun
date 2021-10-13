const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/users-controller');
const { body } = require ('express-validator');

/** MIDDLEWARES **/
const validateLogin = require("../middlewares/validateLogin.js");
const adminVisitor = require("../middlewares/adminVisitor.js");
const loggedoutRedirect = require("../middlewares/loggedoutRedirect.js");
const validationCreateFormUser = require('../Middlewares/validateCreatUser');
const uploadUser = require("../Middlewares/multerUser");  //Multer


/*** CREAR USUARIO ***/
router.get('/registro', adminVisitor, usersController.create); // Imprimir hoja para crear producto
router.post('/', uploadUser.single('image'), validationCreateFormUser, usersController.store);

/*** SESIONES ***/
router.get('/inicio', adminVisitor, usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)
router.get('/logout', loggedoutRedirect, usersController.logout);

/*** Perfil de usuario ***/
router.get('/perfil', loggedoutRedirect, usersController.profile);
router.get('/compras', loggedoutRedirect, usersController.orders);
router.get('/editar', loggedoutRedirect, usersController.edit);
router.put('/editar', loggedoutRedirect, uploadUser.single('image'), usersController.update);
router.post('/:id/borrar-direccion', usersController.deleteAddress);



module.exports = router;