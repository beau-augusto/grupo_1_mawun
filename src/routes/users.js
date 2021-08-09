const express = require('express');
const router = express.Router();
const multer = require ('multer');
const {check} = require('express-validator');



let validateLogin = [
    check('name')
    .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
    .isLength({ min:4, max: 20}).withMessage('Debe ser de entre 4 y 15 caracteres')
    .isEmail().withMessage('Debe ser un mail válido'),
    check('password')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min:4, max: 20}).withMessage('Debe ser de entre 4 y 15 caracteres')
]


const usersController = require('../controllers/users-controller');

router.get('/registro', usersController.create);
router.post('/', usersController.store);
router.get('/inicio', usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)



module.exports = router;