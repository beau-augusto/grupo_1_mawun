const {body} = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcryptjs = require("bcryptjs");
const { nextTick } = require('process');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = [
    body('name')
    .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
    .isLength({ min:4, max: 30}).withMessage('Debe ser de entre 4 y 30 caracteres')
    .isEmail().withMessage('Debe ser un mail válido')
    .custom ((value, {req}) => {
        let findUsername = users.find(user => user.email == req.body.name);
        if (!findUsername) {
            throw new Error('Este correo electrónico no está registrado');
        } else {
            
            return true;
        };
        // Validando el nombre de usuario en el JSON
    }),
    
    body('password')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min:4, max: 60}).withMessage('Debe ser de entre 4 y 30 caracteres')
    .custom (async (value, {req}) => {

        let findUsername = users.find(user => user.email == req.body.name);

        if(!findUsername){
            return false

        }
        let bcryptCompare = await bcryptjs.compare(req.body.password, findUsername.password)
        if (bcryptCompare == true) {

            req.session.usuarioLogeado = findUsername  // Guarda usuario en session
            return true;
        } else {
            
            throw new Error('La contraseña no es correcta');
        };
        // Validando la contraseña del usuario en el JSON
    })

]
