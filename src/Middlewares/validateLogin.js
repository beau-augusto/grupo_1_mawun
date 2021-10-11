const {body} = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcryptjs = require("bcryptjs");
const { nextTick } = require('process');

const User = require('../models/User');


module.exports = [
    body('name')
    .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
    .isLength({ min:4, max: 30}).withMessage('Debe ser de entre 4 y 30 caracteres')
    .isEmail().withMessage('Debe ser un mail válido')
    .custom (async (value, {req}) => {

       let findUsername = await User.findByEmail(req.body.name); // encuentra el usuario por su mail
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

       let findUsername = await User.findByEmail(req.body.name); // encuentra el usuario por su mail

       let address = findUsername.addresses // ordeno la data para guardar en session 
       let userData = {
        id: findUsername.id,
        name: findUsername.name,
        last_name: findUsername.last_name,
        email: findUsername.email,
        password: findUsername.password,
        image: findUsername.image,
        role_id: findUsername.role_id,
        role: findUsername.roles.name,
        address_id: (address.length > 0) ? address[0].id : "",
        street: (address.length > 0) ? address[0].street : "",
        apartment: (address.length > 0)  ? address[0].apartment : "",
        zip_code: (address.length > 0)  ? address[0].zip_code : "",
        district: (address.length > 0) ? address[0].district : "",
        city: (address.length > 0) ? address[0].city : "",
        state: (address.length > 0) ? address[0].state : "",
    }

        if(!findUsername){
            return false

        }
        let bcryptCompare = await bcryptjs.compare(req.body.password, findUsername.password)
        if (bcryptCompare == true) {

            req.session.usuarioLogeado = userData  // Guarda usuario en session
            return true;
        } else {
            
            throw new Error('La contraseña no es correcta');
        };
        // Validando la contraseña del usuario en el JSON
    })

]
