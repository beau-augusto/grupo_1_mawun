const multer = require ('multer');
const path = require('path');
const fs = require('fs');

const { body } = require('express-validator'); // Destructuracion pido la propiedad body (Express-Validator)

module.exports = [
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