const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");





const usersController = {
    create: (req, res)=> {
        res.render ('users/create-users');
    },
    store: (req, res)=> {
        //res.render ('users/create-users');
        res.send('ok');
    },
    login: (req, res)=> {
       res.render ('users/login');
    },
    submitLogin: (req, res) => {
        let errors = validationResult(req); // Traigo los errores de Express Validator
        if (errors.isEmpty()) {
            
            // Si no hay errores de validación, avanzo al Back Office
           return res.redirect ('/admin/inventario');

        } else {

            // Si hay errores, devuelvo la pagina de login con los errores en formato de JSON u objeto literal. 

        res.render ('users/login', {errors: errors.mapped(), old: req.body});
        }
 
    }
};

module.exports = usersController;