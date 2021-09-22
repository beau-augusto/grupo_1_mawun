const multer = require ('multer');
const path = require('path');
const fs = require('fs');

const { body } = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const validationCreateFormUser = [
    body('first_name').notEmpty().withMessage('Tienes que completar con tu nombre'),
    body('last_name').notEmpty().withMessage('Tienes que completar con tu apellido'),
    body('email')
        .notEmpty().withMessage('Tienes que completar con tu correo electrónico').bail()
        .isEmail().withMessage('Tienes que completar con un  formato de correo electrónico válido')
        .custom((value, {req}) => {

            let findUsername = users.find(user => user.email == req.body.email)
            if (findUsername) {
                throw new Error('Este usuario ya existe');
            }

        return true;
    
        }),
    body('role').notEmpty().withMessage('Debes selecionar el tipo de usuario'),
    body('password').notEmpty().withMessage('Tienes que completar con una contraseña'),
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
