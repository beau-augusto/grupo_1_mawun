const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/users-controller');

/** MIDDLEWARES **/
const validateLogin = require("../middlewares/validateLogin.js");

/*** Multer ***/
const multer  = require('multer');
const upload = multer();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../../public/upload/users/');
        cb(null, folder);

    },
    filename: (req, file, cb) => {
        let imageName = 'users-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});
let fileUpload = multer({ storage });

/*** CREAR USUARIO ***/
router.get('/registro', usersController.create); // Imprimir hoja para crear producto
router.post('/', fileUpload.single('imagen'), usersController.store);

/*** SESIONES ***/
router.get('/inicio', usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)



module.exports = router;