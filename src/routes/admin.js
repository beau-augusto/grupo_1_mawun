const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin-controller');

const { body } = require('express-validator'); // Destructuracion pido la propiedad body (Express-Validator)

/** MIDDLEWARES **/
const validateCreatProduct = require("../middlewares/validateCreatProduct.js");
const validateCreatUser = require("../middlewares/validateCreatUser.js");


/*** Multer ***/
const uploadUser = require("../Middlewares/multerUser");
const uploadProduct = require("../Middlewares/multerProduct");
const validateCreatUserBO = require("../middlewares/validateCreatUserBO.js");

/*** DETALLE BO ***/
router.get('/inventario-productos', adminController.inventoryProducts);

/*** DETALLE BO ***/
router.get('/inventario-usuarios', adminController.inventoryUsers);

/*** CREAR UN PRODUCTO ***/
router.get('/crear', adminController.create);
router.post('/', uploadProduct.single('image'), validateCreatProduct, adminController.store);


/*** EDITAR UN PRODUCTO ***/
router.get('/:id/editar', adminController.edit);
router.put('/:id', uploadProduct.single('image'), adminController.update);
router.delete('/:id/delete', adminController.delete);

/*** ADMINISTRAR UN USUARIO ***/
router.get('/perfil/:id', adminController.profile); // Perfil de Usuario BO
router.get('/crear-usuario', adminController.createUser);
router.post('/crear-usuario', uploadUser.single('image'), validateCreatUserBO, adminController.storeUser);

router.get('/:id/editar-usuario', adminController.editUser);
router.put('/:id/editar-usuario', uploadUser.single('image'), adminController.updateUser);
router.delete('/:id/delete-usuario', adminController.deleteUser);

/** Newsletter*/
router.post('/news', adminController.newsletterStore);


module.exports = router;