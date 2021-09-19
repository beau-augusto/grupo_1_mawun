const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator'); // Destructuracion pido resultdo de la validacion (Express-Validator)

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); // Ruta donde se encuentra la DB
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // Cambio el formato Json a un array de productos

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const bcryptjs = require("bcryptjs"); 

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const adminController = {
    inventoryProducts: (req, res)=> {

        if(req.session.usuarioLogeado){

            return res.render ('./admin/inventory-products', {products}); // Imprimir Lista de productos ABM y el Usuario logeado 
        } else {
            return res.redirect("users/login")
        }
    },
    create: (req, res)=> {
        return res.render ('admin/create-product'); // Imprimir hoja para crear producto
    },
    store: (req, res)=> {

        const errors = validationResult(req); // Obtengo informacion del Express validator y la cargo en la variable error

        // Si errores de express Validator viene vacio continuo
        if (errors.isEmpty()){ 
        const lastProduct = products [products.length - 1]; //Obtengo el último indice del array

        const productToCreate = req.body; //Obtengo la informacion del formulario
        productToCreate.image = req.file.filename; //Obtengo la imagen del formulario
        productToCreate.price = Number(req.body.price); /// Transformo el campo de string a numero
        productToCreate.recommended = Number(req.body.recommended); //Transformo el campo de string a numero
        productToCreate.id = lastProduct.id + 1; //Agrego el id del Nvo producto

        products.push(productToCreate); //Añado a Products el elemento creado al final de un array
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); // Transformo el nuevo array de productos en Json

        return res.redirect (303, '/admin/inventario-productos'); //Codigo 303, redirecciona a la ruta se desee

        } else {
            return res.render ('admin/create-product', { 
                errors: errors.mapped(), 
                oldInfo: req.body //Si hay errores vuelvo a la vista con errores y campos ya completados por el cliente con oldInfo
            }); 
        };
    },
    edit: (req, res)=> {
        const id = req.params.id; // Obtengo el parámetro para buscar el recurso
		const product = products.find((prod) => prod.id == id); // Busco si esta el pruducto

		if (!product) {
			return res.send('No pudimos encotrar ese Producto')
		};

		const viewData = { product };
        return res.render ('admin/edit-product', viewData);
    },
    update: (req, res) => {
        const indexProduct = products.findIndex( product => product.id == req.params.id); //Busco el indice del pruducto en el array con el id recibido por el accion del formulario

        req.body.image = req.file ? req.file.filename : req.file.filename;

        products[indexProduct] = { ...products[indexProduct], ...req.body};
        // si tengo req.file me estan enviando nvo archivo si no req.file.filename

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		return res.redirect(303, '/admin/inventario-productos');
	}, 
    delete: 
    (req, res)=> {
        const indexProduct = products.findIndex( product => product.id == req.params.id);

        if (indexProduct === -1) {
            return res.send ('El producto que buscás no existe.');
        }
        products.splice(indexProduct, 1);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        return res.redirect('/admin/inventario');
    },
    inventoryUsers: (req, res)=> {

        if(req.session.usuarioLogeado){

            return res.render ('./admin/inventory-users', {users}); // Imprimir Lista de productos ABM y el Usuario logeado 
        } else {
            return res.redirect("users/login")
        }
    },
    createUser: (req, res)=> {
        return res.render ('admin/create-user'); // Imprimir hoja para crear producto
    },
    storeUser: (req, res)=> {

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
       return res.redirect (303, '/admin/inventario-usuarios'); //Codigo 303, redirecciona a la ruta se desee
        } else {
            return res.render ('admin/create-user', { 
                errors: resultValidation.mapped(), 
                oldData: req.body //campos ya completados por el cliente con oldData
            }); 
        };
    },
    deleteUser: (req, res)=> {
        const indexUser = users.findIndex( user => user.id == req.params.id);

        if (indexUser === -1) {
            return res.send ('El producto que buscás no existe.');
        }
        users.splice(indexUser, 1);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        return res.redirect('/admin/inventario-usuarios');
    }
};

module.exports = adminController;