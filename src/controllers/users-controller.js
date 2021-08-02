const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');



const usersController = {
    register: (req, res)=> {
        res.render ('users/register');
    },
    login: (req, res)=> {
       res.render ('users/login');
    },
    submitLogin: (req, res) => {
        let errors = validationResult(req); // Traigo los errores de Express Validator

        console.log(errors)

        if (errors.isEmpty()) {

            // Si no hay errores, avanzo al Back Office
            
        } else {

            // Si hay errores, devuelvo la pagina de login con los errores

        res.render ('users/login', {errors: errors.mapped(), old: req.body});
        }
        return res.render ('users/admin/inventory');
    }
};

module.exports = usersController;