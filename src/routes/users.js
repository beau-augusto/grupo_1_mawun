const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/users-controller');
const { body } = require ('express-validator');

/** MIDDLEWARES **/
const validateLogin = require("../middlewares/validateLogin.js");
const adminVisitor = require("../middlewares/adminVisitor.js");
const loggedoutRedirect = require("../middlewares/loggedoutRedirect.js");

/*** Multer ***/
const multer  = require('multer');
const validationCreateFormUser = require('../Middlewares/validateCreatUser');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../../public/upload/profile-pictures/');
        cb(null, folder);

    },
    filename: (req, file, cb) => {
        let newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

let fileUpload = multer({ storage });


/*** CREAR USUARIO ***/
router.get('/registro', adminVisitor, usersController.create); // Imprimir hoja para crear producto
router.post('/', fileUpload.single('image'), validationCreateFormUser, usersController.store);

/*** SESIONES ***/
router.get('/inicio', adminVisitor, usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)
router.get('/logout', loggedoutRedirect, usersController.logout);

/*** Perfil de usuario ***/
router.get('/perfil/:id', loggedoutRedirect, usersController.profile);

router.get('/:id/editar', loggedoutRedirect, usersController.edit);
router.put('/:id/editar', loggedoutRedirect, fileUpload.single('image'), usersController.update);
// router.delete('/:id/delete', usersController.deleteProfile);

module.exports = router;