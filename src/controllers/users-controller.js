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
            let userSession = await User.findByEmail(userToCreate.email) // buscar al usuario creado para iniciar sesion porque el ID del nuevo usuario no esta en el body
            req.session.usuarioLogeado = userSession  // Automaticamente logea al usuario y lo guarda en session

            return res.redirect(303, '/productos'); //Codigo 303, redirecciona a la ruta se desee
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


        if(datosCookie){

            return res.render ('users/login', datosCookie); 
        } else {
            return res.render ('users/login'); 
        }
     
    
    },
    submitLogin: (req, res) => { // esta logica es un quilombo pero funciona jaja
        let errors = validationResult(req); // Traigo los errores de Express Validator
        if (errors.isEmpty()) {


            if (req.session.usuarioLogeado.role_id == "1"){
                if(req.body.remember){
                    res.cookie("recordame", req.body.name, { maxAge: 900000 * 1000})
                }
                if(req.session.redirect){
                    const url1 =  req.session.redirect.replace(/[0-9]/g, '') // 
                    const url = url1.replace(/\W/g, '') // expression regulares que sacan los numeros y las barras 
                    const idVisitado = req.session.redirect.replace( /^\D+/g, '') // Extraigo el numero de ID de producto del url visitado con un expression regular

                if(url == "carrito"){
                    if(idVisitado){

                        return res.redirect(`/productos/detalle/${idVisitado}`)
                    } else {
                        return res.redirect('/productos/carrito')
                    }
                }} 


                    return res.redirect ('/admin/dashboard')
                
                }
                  else {

                if(req.body.remember){
                    res.cookie("recordame", req.body.name, { maxAge: 900000 * 1000})

                }
                    if(req.session.redirect){
                    const url1 =  req.session.redirect.replace(/[0-9]/g, '') // 
                    const url = url1.replace(/\W/g, '') // expression regulares que sacan los numeros y las barras 
                    const idVisitado = req.session.redirect.replace( /^\D+/g, '') // Extraigo el numero de ID de producto del url visitado con un expression regular

                    if(url == "carrito"){
                        if(idVisitado){

                        return res.redirect(`/productos/detalle/${idVisitado}`)
                    } else {

                        return res.redirect("/productos");
                    }}

            } 
                return res.redirect("/productos");
            

        }} else {

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
    orders: async (req, res)=> {

        if (res.locals.usuarioLogeado != undefined){

        try {
           
            let userFound = await User.findPK(res.locals.usuarioLogeado.id); // encuentra un usuario por su PK
            
            if (userFound) {
                return res.render('./users/user-orders', { user: userFound });
            } else {
                res.send('El usuario que buscás no existe.')
            }
        } catch (error) {
            console.log(error);
        }
    }
    },
    edit: async (req, res)=> {  
        try {
            let userFound = await User.findPK(res.locals.usuarioLogeado.id); // encuentra un usuario por su PK

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
        try {
        let PK = res.locals.usuarioLogeado.id // saca el PK del usuario desde locals
            
            let userData = await User.findPK(PK); // encuentra un usuario por su PK
            if (resultValidation.isEmpty()) {
            req.body.image = req.file ? req.file.filename : userData.image; // si hay una nueva imagen se agrega al body, si no, se agrega la anterior

            let NewUserData = {
                name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password === "" ? userData.password : bcryptjs.hashSync(req.body.password, 10), // logica de contrasenia
                image: req.body.image, // si manda una imagen nueva, agregarla. si no, dejar la anterior
                street: req.body.calle_numero,
                apartment: req.body.departamento,
                district: req.body.barrio,
                zip_code: req.body.codigo_postal,
                city: req.body.ciudad,
                state: req.body.provincia
            }
            await User.update(NewUserData, PK); // actualizar el usuario con la data nueva del formulario 
          if (req.body.calle_numero != "" && req.body.ciudad != ""){ // si el usuario no tiene una fila de direccion creada, pasa la logica por aca
             console.log('create new address');
            await User.createAddress(NewUserData, userData.id); // crea una nueva fila en addresses que corresponde al usuario ya existente
            }
        if(req.body.address){
            console.log('update user');

            
            updateData = {
                street: req.body.calle_numero_edit,
                apartment: req.body.departamento_edit,
                district: req.body.barrio_edit,
                zip_code: req.body.codigo_postal_edit,
                city: req.body.ciudad_edit,
                state: req.body.provincia_edit
            }

            await User.updateAddressbyID(updateData, req.body.address); // si pasa por aca es porque ya existe una fila en addresses y simplemente la actualiza
        }
            

    
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
    deleteAddress:  async (req, res) => {
        let userID = req.params.id;
        let addressID = req.body.addressid;
try {
    await User.deleteAddress(addressID, userID);
    return res.redirect('/usuarios/perfil');
    
} catch (error) {
    
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