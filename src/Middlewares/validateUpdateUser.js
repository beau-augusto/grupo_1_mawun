const multer = require ('multer');
const path = require('path');
const fs = require('fs');

const { body } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const validationUpdateUser = [
    body('first_name').notEmpty().withMessage('Tienes que completar con tu nombre').bail().isLength({ min:4, max: 20}).withMessage('Debe ser de entre 4 y 20 caracteres'),
    body('last_name').notEmpty().withMessage('Tienes que completar con tu apellido').bail().isLength({ min:4, max: 20}).withMessage('Debe ser de entre 4 y 20 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que completar con tu correo electrónico').bail()
        .isEmail().withMessage('Tienes que completar con un  formato de correo electrónico válido'),
    body('role').notEmpty().withMessage('Tienes que seleccionar un role'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let extensionAccepted = ['.jpg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!extensionAccepted.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${extensionAccepted.join(', ')}`);
            } else {

            }
        }

    return true;

    })
];

module.exports = validationUpdateUser;
