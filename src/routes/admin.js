const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin-controller');

const { body } = require('express-validator'); // Destructuracion pido la propiedad body (Express-Validator)

/** MIDDLEWARES **/
const validateCreatProduct = require("../middlewares/validateCreatProduct.js");
const validateUpdateUser = require("../middlewares/validateUpdateUser.js");

/*** Multer ***/
const uploadUser = require("../Middlewares/multerUser");
const uploadProduct = require("../Middlewares/multerProduct");
const validateCreatUserBO = require("../middlewares/validateCreatUserBO.js");

/*** DETALLE BO ***/
router.get('/dashboard', adminController.dashboard);
router.get('/inventario-productos', adminController.inventoryProducts);
router.get('/inventario-usuarios', adminController.inventoryUsers);
router.get('/inventario-newsletter', adminController.inventoryNewsletter);

/*** PRODUCTO ***/
router.get('/crear', adminController.createProduct);
router.post('/', uploadProduct.single('image'), validateCreatProduct, adminController.storeProduct);
router.get('/:id/editar', adminController.editProduct);
router.put('/:id', uploadProduct.single('image'), adminController.updateProduct);
router.delete('/:id/delete', adminController.deleteProduct);

/*** ADMINISTRAR UN USUARIO ***/
router.get('/perfil/:id', adminController.profile); // Perfil de Usuario BO
router.get('/crear-usuario', adminController.createUser);
router.post('/crear-usuario', uploadUser.single('image'), validateCreatUserBO, adminController.storeUser);

router.get('/:id/editar-usuario', adminController.editUser);
router.put('/:id/editar-usuario', uploadUser.single('image'), validateUpdateUser, adminController.updateUser);
router.delete('/:id/delete-usuario', adminController.deleteUser);

/*** ELIMINAR EMAIL DEL NEWSLETTER ***/



module.exports = router;