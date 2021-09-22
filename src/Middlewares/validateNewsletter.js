const path = require('path');
const fs = require('fs');

const { body } = require('express-validator');
const emailFilePath = path.join(__dirname, '../data/newsletterDataBase.json');
const emails = JSON.parse(fs.readFileSync(emailFilePath, 'utf-8'));

const validationNewsletter = [
    body('email')
        .isEmail().withMessage('Tienes que completar con un  formato de correo electrónico válido')
        .custom((value, {req}) => {

            let findEmailName = emails.find(email => email.email == req.body.email)
            if (findEmailName) {
                throw new Error('Este email ya existe');
            }

        return true;
    
        })
];

module.exports = validationNewsletter;