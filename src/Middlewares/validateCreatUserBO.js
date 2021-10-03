const multer = require ('multer');
const path = require('path');
const fs = require('fs');

const { body } = require('express-validator');
const User = require('../models/User');

const validationCreateFormUser = [
    body('first_name').notEmpty().withMessage('Tienes que completar con tu nombre').bail().isLength({ min:4, max: 20}).withMessage('Debe ser de entre 4 y 20 caracteres'),
    body('last_name').notEmpty().withMessage('Tienes que completar con tu apellido').bail().isLength({ min:4, max: 20}).withMessage('Debe ser de entre 4 y 20 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que completar con tu correo electrónico').bail()
        .isEmail().withMessage('Tienes que completar con un  formato de correo electrónico válido')
        .custom(async(value, {req}) => {

            let findUsername = await User.findByEmail(req.body.email); // encuentra el usuario por su mail
            if (findUsername) {
                throw new Error('Este usuario ya existe');
            }

        return true;
    
        }),
    body('role').notEmpty().withMessage('Debes selecionar el tipo de usuario'),
    body('password').notEmpty().withMessage('Tienes que completar con una contraseña').isLength({ min:4, max: 30}).withMessage('Debe ser de entre 4 y 30 caracteres'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let extensionAccepted = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!extensionAccepted.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${extensionAccepted.join(', ')}`);
            }
        }

    return true;

    })
];

module.exports = validationCreateFormUser;
