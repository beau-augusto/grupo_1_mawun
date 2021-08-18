const multer = require ('multer');
const {check} = require('express-validator');
const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = [
    check('name')
    .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
    .isLength({ min:4, max: 25}).withMessage('Debe ser de entre 4 y 25 caracteres')
    .isEmail().withMessage('Debe ser un mail válido')
    .custom ((value, {req}) => {
        let findUsername = users.find(user => user.email == req.body.name);
       
        if (!findUsername) {
            throw new Error('Este correo electrónico no está registrado');
        } else {
            check('password')
            .notEmpty().withMessage('Debes completar la contraseña').bail()
            .isLength({ min:4, max: 30}).withMessage('Debe ser de entre 4 y 30 caracteres')
            .custom ((value, {req}) => {
                let findPassword = users.find(user => user.password == req.body.password);
               
                if (!findPassword) {
                    throw new Error('La contraseña no es correcta');
                } else {
                    return true;
                };
                // Validando la contraseña del usuario en el JSON
            })
            req.session.usuarioLogeado = findUsername  // Guarda usuario en session

            return true;
        };
        // Validando el nombre de usuario en el JSON
    }),

    
]
