const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator'); // Destructuracion pido resultdo de la validacion (Express-Validator)

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); // Ruta donde se encuentra la DB
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // Cambio el formato Json a un array de productos
const chalk = require('chalk');

const bcryptjs = require("bcryptjs");

//Sequelize Models//
const db = require("../database/models");
const User = require("../../src/models/User");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const adminController = {
    dashboard: (req, res)=> {
        return res.render ('admin/dashboard');
    },
    inventoryProducts: async (req, res)=> {
        if(req.session.usuarioLogeado){

            db.Product.findAll( {order:[['name','ASC']]})
            .then(function (products){
                res.render ('./admin/inventory-products', {products:products});
            })
    } else {
            return res.redirect("users/login");
        }
    },
    create: (req, res) => {
        return res.render('admin/create-product'); // Imprimir hoja para crear producto
    },
    store: (req, res) => {

        const errors = validationResult(req); // Obtengo informacion del Express validator y la cargo en la variable error

        // Si errores de express Validator viene vacio continuo
        if (errors.isEmpty()) {
            const lastProduct = products[products.length - 1]; //Obtengo el último indice del array

            const productToCreate = req.body; //Obtengo la informacion del formulario
            productToCreate.image = req.file.filename; //Obtengo la imagen del formulario
            productToCreate.price = Number(req.body.price); /// Transformo el campo de string a numero
            productToCreate.recommended = Number(req.body.recommended); //Transformo el campo de string a numero
            productToCreate.id = lastProduct.id + 1; //Agrego el id del Nvo producto

            products.push(productToCreate); //Añado a Products el elemento creado al final de un array
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); // Transformo el nuevo array de productos en Json

            return res.redirect(303, '/admin/inventario-productos'); //Codigo 303, redirecciona a la ruta se desee

        } else {
            return res.render('admin/create-product', {
                errors: errors.mapped(),
                oldInfo: req.body //Si hay errores vuelvo a la vista con errores y campos ya completados por el cliente con oldInfo
            });
        };
    },
    edit: (req, res) => {
        const id = req.params.id; // Obtengo el parámetro para buscar el recurso
        const product = products.find((prod) => prod.id == id); // Busco si esta el pruducto

        if (!product) {
            return res.send('No pudimos encotrar ese Producto')
        };

        const viewData = { product };
        return res.render('admin/edit-product', viewData);
    },
    update: (req, res) => {
        const indexProduct = products.findIndex(product => product.id == req.params.id); //Busco el indice del pruducto en el array con el id recibido por el accion del formulario

        req.body.image = req.file ? req.file.filename : req.file.filename;

        products[indexProduct] = { ...products[indexProduct], ...req.body };
        // si tengo req.file me estan enviando nvo archivo si no req.file.filename

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        return res.redirect(303, '/admin/inventario-productos');
    },
    delete: (req, res) => {

        const indexProduct = products.findIndex(product => product.id == req.params.id);

        if (indexProduct === -1) {
            return res.send('El producto que buscás no existe.');
        }
        products.splice(indexProduct, 1);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        return res.redirect('/admin/inventario');
    },
    inventoryUsers: async (req, res) => {
        try {

        let allUsers = await User.all(); // llama a todos los usuarios

        if (req.session.usuarioLogeado) {
            return res.render('./admin/inventory-users', { users: allUsers });

        } else {
            return res.redirect("users/login")
        }
        } catch (error) {
            console.error(error);
        }
    },
    profile: async (req, res) => {
        try {

        let userFound = await User.findPK(req.params.id); // encuentra un usuario por su PK
        let test = await User.findByEmail(userFound.email)

        if (userFound) {
            return res.render('./admin/user-profile-bo', { user: userFound });
        } else {
            res.send('El usuario que buscás no existe.')
        }
    } catch (error) {
        console.log(error);
    }
    },
    createUser: (req, res) => {

        return res.render('admin/create-user'); // Imprimir hoja para crear producto
    },
    storeUser: async (req, res) => {

        const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error
        try {
        req.body.image = req.file ? req.file.filename : "";
        if (resultValidation.isEmpty()) {

            const userToCreate = {  //Obtengo la informacion del formulario y la creo 
                name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                role_id: (req.body.role === "admin" ? 1 : 2), // si es admin guardar 1, sino 2. 
                image: req.body.image, //Obtengo la imagen del formulario - req.file.filename
            }

            await User.create(userToCreate);

            return res.redirect(303, '/admin/inventario-usuarios'); //Codigo 303, redirecciona a la ruta se desee
        } else {
            return res.render('admin/create-user', {
                errors: resultValidation.mapped(),
                oldData: req.body //campos ya completados por el cliente con oldData
            });
        };
    } catch (error) {
        console.error(error);
    }
    },
    editUser: async (req, res) => {

        try {
            let userFound = await User.findPK(req.params.id); // encuentra un usuario por su PK
            if (userFound) {
                return res.render('./admin/edit-user', { user: userFound });
            } else {
                res.send('El usuario que buscás no existe.')
            }
        } catch (error) {
            console.error(error)
        }
        
    },
    updateUser: async (req, res) => {
        const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error

        try {
            let userData = await User.findPK(req.params.id); // encuentra un usuario por su PK 

            if (resultValidation.isEmpty()) {
            req.body.image = req.file ? req.file.filename : userData.image;
    
            let NewUserData = {
                name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password === "" ? userData.password : bcryptjs.hashSync(req.body.password, 10), // logica de contrasenia
                image: req.body.image, // si manda una imagen nueva, agregarla. si no, dejar la anterior
                role_id: (req.body.role === "admin" ? 1 : 2), // si es admin guardar 1, sino 2. 
                street: req.body.calle_numero,
                apartment: req.body.departamento,
                district: req.body.barrio,
                zip_code: req.body.codigo_postal,
                city: req.body.ciudad,
                state: req.body.provincia
            }

          await User.update(NewUserData, req.params.id); // actualizar el usuario con la data nueva del formulario 
             if (userData['addresses.street'] == null){ // si el usuario no tiene una direccion cargada, pasa la logica por aca
            
                let updateCreate = { // se le agrega el id y user_id para la table addresses
                 ...NewUserData, // mantiene la informacion nueva a subir
                 id: userData.id,
                 user_id: userData.id
             }
                await User.createAddress(updateCreate); // crea una nueva fila en addresses que corresponde al usuario ya existente
            }
            else {
             await User.updateAddress(NewUserData, req.params.id); // si pasa por aca es porque ya existe una fila en addresses y simplemente la actualiza
            }

    
            return res.redirect(303, '/admin/inventario-usuarios');
            } else {
                return res.render('./admin/edit-user',{
                    errors: resultValidation.mapped(),
                    user: userData,
                    oldData: req.body //campos ya completados por el cliente con oldData
                });
            };
        } catch (error) {
            console.error(error)
        }
    },
    deleteUser: async (req, res) => {

        await User.delete(req.params.id);
        return res.redirect('/admin/inventario-usuarios');
    }
}

module.exports = adminController;