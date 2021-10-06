const path = require('path');
const fs = require('fs');

const { body } = require('express-validator');

const User = require('../models/User');

const validationNewsletter = [
    body('email')
        .isEmail().withMessage('Tienes que completar con un  formato de correo electrónico válido')
        .custom(async (value, {req}) => {

           let findEmailName = await User.findByEmail(req.body.email); // encuentra el usuario por su mail
            if (findEmailName) {
                throw new Error('Este email ya existe');
            }

        return true;
    
        })
];

module.exports = validationNewsletter;