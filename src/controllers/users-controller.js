const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const bcryptjs = require("bcryptjs"); 

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    create: (req, res)=> {
        res.render ('users/create-users');
    },
    store: (req, res)=> {

        const lastUser = users [users.length - 1]; //Obtengo el último indice del array
        const userToCreate = {  //Obtengo la informacion del formulario y la creo 
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename, //Obtengo la imagen del formulario - req.file.filename
            id: lastUser.id + 1 //Agrego el id del Nvo usuario
         } 

        users.push(userToCreate); //Añado a Ususario creado al final de un array
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); // Transformo el nuevo array de usuarios en Json

        return res.redirect (303, '/'); //Codigo 303, redirecciona a la ruta se desee
    },
    login: (req, res)=> {
       res.render ('users/login');
    },
    submitLogin: (req, res) => {
        let errors = validationResult(req); // Traigo los errores de Express Validator
        if (errors.isEmpty()) {
            let findUsername = users.find(user => user.email == req.body.name);
            res.cookie("recordame", findUsername.email, { maxAge: 600000}) // Si no hay errores de validación, creo una cookie
          
            // Y avanzo al Back Office
           return res.redirect ('/admin/inventario');

        } else {

            // Si hay errores, devuelvo la pagina de login con los errores en formato de JSON u objeto literal. 

        res.render ('users/login', {errors: errors.mapped(), old: req.body});
        }
 
    }
};

module.exports = usersController;