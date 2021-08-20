const express = require('express');
const router = express.Router();
const path = require('path');
const { body } = require('express-validator'); // Destructuracion pido la propiedad body (Express-Validator)

const adminController = require('../controllers/admin-controller');
const adminRedirect = require('../Middlewares/adminRedirect'); // El middleware asegurar de que estés logeado en las rutas admin

/*** Validaciones Crear (Express-Validator) ***/
const validateCreatForm = [
    body('product_name').notEmpty().withMessage('Debes completar el campo Nombre del producto'),
    body('category').notEmpty().withMessage('Debes completar el campo Categoría del producto'),
    body('price').notEmpty().withMessage('Debes completar el campo Precio del producto'),
    body('varietal').notEmpty().withMessage('Debes completar el campo Varietal del producto'),
    body('winery').notEmpty().withMessage('Debes completar el campo Bodega del producto'),
    body ('image').custom ((value, {req}) => {
        let file = req.file;
        let permitedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
        if (!file) {
            throw new Error('Debes subir una imagen de Producto');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!permitedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${permitedExtensions.join(', ')}`);
            }
        };
        return true;
    })
];

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

/*** CREAR UN PRODUCTO ***/
router.get('/crear', adminController.create);
router.post('/', upload.single('image'), validateCreatForm, adminController.store);
router.get('/inventario', adminController.inventory);

/*** EDITAR UN PRODUCTO ***/
router.get('/:id/editar', adminController.edit);
router.put('/:id', upload.single('image'), adminController.update);
router.delete('/:id/delete', adminController.delete);

/*** Perfil de usuario ***/
router.get('/user-profile', adminController.profile);

module.exports = router;