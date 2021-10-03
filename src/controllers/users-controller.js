const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs"); 

//Sequelize Models//
const User = require("../../src/models/User");

const usersController = {
    create: (req, res)=> {
        res.render ('users/create-users');
    },
    store: async (req, res)=> {

        const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error

        try {
        if (resultValidation.isEmpty()) {

            const userToCreate = {  //Obtengo la informacion del formulario y la creo 
                name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                role_id: 2, // siempre es visitante
                image: req.file.filename, //Obtengo la imagen del formulario - req.file.filename
            }

            await User.create(userToCreate);
            req.session.usuarioLogeado = userToCreate  // Automaticamente logea al usuario y lo guarda en session

            return res.redirect(303, 'products/index'); //Codigo 303, redirecciona a la ruta se desee
        } else {
            return res.render ('users/create-users', {
                errors: resultValidation.mapped(),
                oldData: req.body //campos ya completados por el cliente con oldData
            });
        };
    } catch (error) {
        console.error(error);
    }
    },
    login: (req, res)=> {

            let datosCookie= {
                email: req.cookies.recordame

            }
     
        return res.render ('users/login', datosCookie); 
    
    },
    submitLogin: (req, res) => {
        let errors = validationResult(req); // Traigo los errores de Express Validator
        if (errors.isEmpty()) {

            if (req.session.usuarioLogeado.role_id == "1"){
                if(req.body.remember){
                    res.cookie("recordame", req.body.name, { maxAge: 900000 * 1000})
                }

            
                    return res.redirect ('/admin/dashboard');
            
                }
            else {
                if(req.body.remember){
                    res.cookie("recordame", { maxAge: 900000})
                }
                return res.redirect("/productos");

            } 

        } else {

            // Si hay errores, devuelvo la pagina de login con los errores en formato de JSON u objeto literal. 

        res.render ('users/login', {errors: errors.mapped(), old: req.body});
        }
 
    },
    profile: async (req, res)=> {

        if (res.locals.usuarioLogeado != undefined){

        try {
            let userFound = await User.findPK(res.locals.usuarioLogeado.id); // encuentra un usuario por su PK
    
            if (userFound) {
                return res.render('./users/user-profile', { user: userFound });
            } else {
                res.send('El usuario que buscás no existe.')
            }
        } catch (error) {
            console.log(error);
        }
    }
    },
    edit: async (req, res)=> {  
        let PK = res.locals.usuarioLogeado.id
        try {
            let userFound = await User.findPK(PK); // encuentra un usuario por su PK
            if (userFound) {
                return res.render('./users/edit-users', { user: userFound });
            } else {
                res.send('No pudimos encontrar ese perfil.')
            }
        } catch (error) {
            console.error(error)
        }

    },
    update: async (req, res) => {


        const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error
        let PK = res.locals.usuarioLogeado.id

        try {
            let userData = await User.findPK(PK); // encuentra un usuario por su PK 

            if (resultValidation.isEmpty()) {
    
            req.body.image = req.file ? req.file.filename : userData.image;
    
            userData = {
                name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password === "" ? userData.password : bcryptjs.hashSync(req.body.password, 10), // logica de contrasenia
                image: req.body.image, // si manda una imagen nueva, agregarla. si no, dejar la anterior
            }
             await User.update(userData, PK);
           return res.redirect(303, '/usuarios/perfil');
            } else {
                return res.render('./users/edit-user',{
                    errors: resultValidation.mapped(),
                    user: userData,
                    oldData: req.body //campos ya completados por el cliente con oldData
                });
            };
        } catch (error) {
            console.error(error)
        }
	},
    logout: (req, res) => {
        req.session.destroy();
        res.locals.usuarioLogeado = undefined

        let datosCookie= {
            email: req.cookies.recordame // Mandar el cookie a la pagina de login para popular el campo mail 

        }
 
        return res.render ('users/login', datosCookie)
    }
}



module.exports = usersController;