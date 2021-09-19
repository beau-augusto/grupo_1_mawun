const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin-controller');

const { body } = require('express-validator'); // Destructuracion pido la propiedad body (Express-Validator)

/** MIDDLEWARES **/
const validateCreatProduct = require("../middlewares/validateCreatProduct.js");
const validateCreatUser = require("../middlewares/validateCreatUser.js");

/*** Multer ***/
const multer = require ('multer');
const { dirname } = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/upload/products/')
        cb(null, folder)
    },
    filename: function (req, file, cb) {      
        cb(null, file.originalname);
    }
});
const storageUsuarios = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/upload/profile-pictures/')
        cb(null, folder)
    },
    filename: function (req, file, cb) {      
        cb(null, file.originalname);
    }
});

const upload1 = multer({ storage });

const upload2 = multer({ storageUsuarios });

/*** DETALLE BO ***/
router.get('/inventario-productos', adminController.inventoryProducts);
/*** DETALLE BO ***/
router.get('/inventario-usuarios', adminController.inventoryUsers);

/*** CREAR UN PRODUCTO ***/
router.get('/crear', adminController.create);
router.post('/', upload1.single('image'), validateCreatProduct, adminController.store);

/*** CREAR UN USUARIO ***/
router.get('/crear-usuario', adminController.createUser);
router.post('/crear-usuario-enviar', upload2.single('image'), validateCreatUser, adminController.storeUser);
router.delete('/:id/delete', adminController.deleteUser);

/*** EDITAR UN PRODUCTO ***/
router.get('/:id/editar', adminController.edit);
router.put('/:id', upload1.single('image'), adminController.update);
router.delete('/:id/delete', adminController.delete);



module.exports = router;