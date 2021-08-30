const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/users-controller');
const { body } = require ('express-validator');

/** MIDDLEWARES **/
const validateLogin = require("../middlewares/validateLogin.js");


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
router.get('/registro', usersController.create); // Imprimir hoja para crear producto
router.post('/', fileUpload.single('image'), validationCreateFormUser, usersController.store);

/*** SESIONES ***/
router.get('/inicio', usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)

/*** Perfil de usuario ***/
router.get('/perfil', usersController.profile);

router.get('/editar', usersController.edit);
// router.put('/:id', upload.single('image'), usersController.editProfile);
// router.delete('/:id/delete', usersController.deleteProfile);

module.exports = router;