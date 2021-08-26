const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin-controller');

const { body } = require('express-validator'); // Destructuracion pido la propiedad body (Express-Validator)

/** MIDDLEWARES **/
const validateCreatProduct = require("../middlewares/validateCreatProduct.js");

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
const upload = multer({ storage });

/*** DETALLE BO ***/
router.get('/inventario', adminController.inventory);

/*** CREAR UN PRODUCTO ***/
router.get('/crear', adminController.create);
router.post('/', upload.single('image'), validateCreatProduct, adminController.store);

/*** EDITAR UN PRODUCTO ***/
router.get('/:id/editar', adminController.edit);
router.put('/:id', upload.single('image'), adminController.update);
router.delete('/:id/delete', adminController.delete);

/*** Perfil de usuario ***/
router.get('/perfil', adminController.profile);

module.exports = router;