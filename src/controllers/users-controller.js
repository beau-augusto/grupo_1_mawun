const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs"); 
const { locals } = require('../app');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    create: (req, res)=> {
        res.render ('users/create-users');
    },
    store: (req, res)=> {

        const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error
        
        if (resultValidation.isEmpty()){

        const lastUser = users [users.length - 1]; //Obtengo el último indice del array
        const userToCreate = {  //Obtengo la informacion del formulario y la creo 
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            role: "visitor",
            image: req.file.filename, //Obtengo la imagen del formulario - req.file.filename
            id: lastUser.id + 1 //Agrego el id del Nvo usuario
        }

        users.push(userToCreate); //Añado a Ususario creado al final de un array
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); // Transformo el nuevo array de usuarios en Json
        
        req.session.usuarioLogeado = userToCreate  // Automaticamente logea al usuario y lo guarda en session


        return res.redirect (303, '/'); //Codigo 303, redirecciona a la ruta se desee
        } else {
            return res.render ('users/create-users', { 
                errors: resultValidation.mapped(), 
                oldData: req.body //campos ya completados por el cliente con oldData
            }); 
        };
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

            if (req.session.usuarioLogeado.role == "admin"){
                if(req.body.remember){
                    res.cookie("recordame", req.body.name, { maxAge: 900000 * 1000})
                }

            
                    return res.redirect ('/admin/inventario-productos');
            
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
    profile: (req, res)=> {
        const user = users.find(user => user.email == res.locals.user.email) 
        if (user != undefined){
       return  res.render ('./users/user-profile', user);
    }   else {
        res.send ('El usuario que buscás no existe.')
        
    }},
    edit: (req, res)=> {
        const user = users.find(user => user.email == res.locals.user.email) 

		if (!user) {
			return res.send('No pudimos encontrar ese perfil')
		};

        
        return res.render('./users/edit-users', user);
    },
    update: (req, res) => {
        let indexUser = users.findIndex(user => user.email == res.locals.user.email); 
        req.body.image = req.file ? req.file.filename : req.file.filename;

        delete users[indexUser]._locals // Borro locals del usuario para que no aparezca en el JSON. Por qué carajos aparece locals 
        let password = bcryptjs.hashSync(req.body.password, 10) // encripya la nueva constraseña
        users[indexUser] = {...users[indexUser], ...req.body, password};

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        const user = users.find(user => user.email == res.locals.user.email) // Agarro el usuario actual para mandarlo a la vista del perfil actualizado

        return  res.render('./users/user-profile', user);
	},
    logout: (req, res) => {
        req.session.destroy();
        res.locals.user = undefined

        let datosCookie= {
            email: req.cookies.recordame // Mandar el cookie a la pagina de login para popular el campo mail 

        }
 
        return res.render ('users/login', datosCookie)
    }
}



module.exports = usersController;