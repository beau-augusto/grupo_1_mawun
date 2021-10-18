const fs = require('fs');
const path = require('path');
const { Op } = require("sequelize");

const { validationResult } = require('express-validator'); // Destructuracion pido resultdo de la validacion (Express-Validator)


const chalk = require('chalk');

const bcryptjs = require("bcryptjs");

//Sequelize Models//
const db = require("../database/models");
const User = require("../../src/models/User");
const { trace } = require('console');
const Product = require('../models/Product');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const adminController = {
    dashboard: (req, res)=> {
        return res.render ('admin/dashboard');
    },
    inventoryProducts: async (req, res)=> {
        try {
            if (req.session.usuarioLogeado){

                let products = await db.Product.findAll()

                return res.render ('./admin/inventory-products', {products});
                
            } else {
                return res.redirect("users/login");
            }
        } catch (error) {
                console.error(error);
        }
    },
    createProduct: async (req, res) => {
        try{
            let wineries = await db.Winery.findAll( {order:[['name','ASC']]}); // Consulta a la Db listado de Bodegas con orden alfabetico
            let tag_types = await db.Tag.findAll({ include:[{association:'tag_types'}]}); // Consulta a la Db listado de Varietales y Categorias con orden alfabetico

            let varietal = tag_types.filter((tag_types) => tag_types.tag_types.name == 'Varietal'); //Filtro la association de product tag por el nombre = Varietal
            varietal = varietal.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres e id

            let category = tag_types.filter((tag_types) => tag_types.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = Categoria
            category = category.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres  e id
            wineries = wineries.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres e id

            return res.render('admin/create-product', {varietal, wineries, category}); // Imprimir hoja para crear producto

        } catch (error) {
            console.error(error);
        }
    },
    storeProduct: async (req, res) => {

        try{
            let wineries = await db.Winery.findAll( {order:[['name','ASC']]}); // Consulta a la Db listado de Bodegas con orden alfabetico
            let tag_types = await db.Tag.findAll({ include:[{association:'tag_types'}]}); // Consulta a la Db listado de Varietales y Categorias con orden alfabetico

            let varietal = tag_types.filter((tag_types) => tag_types.tag_types.name == 'Varietal'); //Filtro la association de product tag por el nombre = Varietal
            varietal = varietal.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres e id

            let category = tag_types.filter((tag_types) => tag_types.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = Categoria
            category = category.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres  e id
            wineries = wineries.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres e id

            const errors = validationResult(req); // Obtengo informacion del Express validator y la cargo en la variable error
            if (errors.isEmpty()) { // Si errores de express Validator viene vacio continuo
                const productToCreate = {  //Obtengo la informacion del formulario y la creo 
                    name: req.body.product_name,
                    price: Number(req.body.price),
                    winery_id: Number(req.body.winery),
                    recommended: Number(req.body.recommended),
                    description: req.body.description,
                    image: req.file.filename,
                }
                let varietalTags = {varietals: req.body.varietal};
                let categoryTags = {categories: req.body.category};
    
                let productCreated = await db.Product.create(productToCreate);

                varietalTags = varietalTags.varietals.map(v => {return { product_id: productCreated.id, tag_type_id: 2, tag_id: Number(v)}});
                categoryTags = categoryTags.categories.map(c => {return { product_id: productCreated.id, tag_type_id: 1, tag_id: Number(c)}});

                await db.Product_tag.bulkCreate(varietalTags);
                await db.Product_tag.bulkCreate(categoryTags);

                return res.redirect(303, '/admin/inventario-productos'); //Codigo 303, redirecciona a la ruta se desee

            } else {
                return res.render('admin/create-product', {
                    
                    errors: errors.mapped(),
                    varietal: varietal,
                    wineries: wineries,
                    category: category,
                    oldInfo: req.body //Si hay errores vuelvo a la vista con errores y campos ya completados por el cliente con oldInfo
                });
            };

        } catch (error) {
            console.error(error);
        } 
    },
    editProduct: async (req, res) => {
        try{
            
            let product = await db.Product.findByPk (req.params.id, { include:[{association:'product_tag', include:[{association:'tag_types'}, {association:'tags'}]} 
            ]});

            let productCategories = product.product_tag.filter((tag) => tag.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = categoria
            productCategories = productCategories.map(v => v.tags.id) //Relaizó un map para obtener unicamente los nombres

            let productVarietals = product.product_tag.filter((tag) => tag.tag_types.name == 'Varietal'); //Filtro la association de product tag por el nombre = Varietal
            productVarietals = productVarietals.map(v => v.tags.id)//Relaizó un map para obtener unicamente los nombres 

            product.dataValues.productCategories = productCategories; //sumo al array de productos la categorias previamente mapeada
            product.dataValues.productVarietals  = productVarietals ; //sumo al array de productos la varietales previamente mapeada

            let wineries = await db.Winery.findAll( {order:[['name','ASC']]}); // Consulta a la Db listado de Bodegas con orden alfabetico
            let tag_types = await db.Tag.findAll({ include:[{association:'tag_types'}]}); // Consulta a la Db listado de Varietales y Categorias con orden alfabetico

            let varietal = tag_types.filter((tag_types) => tag_types.tag_types.name == 'Varietal'); //Filtro la association de product tag por el nombre = Varietal
            varietal = varietal.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres e id

            let category = tag_types.filter((tag_types) => tag_types.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = Categoria
            category = category.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres  e id

            wineries = wineries.map(v => {return {name:v.name, id: v.id}})//Relaizó un map para obtener unicamente los nombres e id

            return  res.render ('admin/edit-product', {product, varietal, wineries, category});

        } catch (error) {
            console.error(error);
        }
        
    },
    updateProduct: async (req, res) => {
        try{
            let productData = await db.Product.findByPk (req.params.id); // encuentra un Producto por id
        
            req.body.image = req.file ? req.file.filename : productData.image;

            const productToUpdate = {  //Obtengo la informacion del formulario y la creo 
                name: req.body.product_name,
                price: Number(req.body.price),
                winery_id: Number(req.body.winery),
                recommended: Number(req.body.recommended),
                description: req.body.description,
                image: req.body.image,
            }
            await db.Product.update(productToUpdate, { where: {id: req.params.id} });

            let varietalTags = {varietals: req.body.varietal};
            varietalTags = varietalTags.varietals.map(v => {return { product_id: req.params.id, tag_type_id: 2, tag_id: Number(v)}});
            let productVarietalTags = await db.Product_tag.findAll({where: { [Op.and]: [ {product_id: req.params.id}, { tag_type_id: 2 }]}});
            let oldVarietal = [];
            for(i = 0; i < productVarietalTags.length; i++){ oldVarietal.push(productVarietalTags[i].id);}
            
            await db.Product_tag.destroy({ where: {id: oldVarietal}});
            await db.Product_tag.bulkCreate(varietalTags);

            let categoryTags = {categories: req.body.category};
            categoryTags = categoryTags.categories.map(c => {return { product_id: req.params.id, tag_type_id: 1, tag_id: Number(c)}});
            let productCategoryTags = await db.Product_tag.findAll({where: { [Op.and]: [ {product_id: req.params.id}, { tag_type_id: 1 }]}});
            let oldCategory = [];
            for(i = 0; i < productCategoryTags.length; i++){oldCategory.push(productCategoryTags[i].id);}

            await db.Product_tag.destroy({ where: {id: oldCategory}});
            await db.Product_tag.bulkCreate(categoryTags);
            
            return res.redirect(303, '/admin/inventario-productos'); //Codigo 303, redirecciona a la ruta se desee
        } catch(error) {
            console.error(error);
        }

    },
    deleteProduct: async (req, res) => {
        try{
            await db.Product.destroy({ where: {id: req.params.id}})
            return res.redirect(303, '/admin/inventario-productos');
        } catch(error) {
            console.error(error);
        }
    },
    searchProduct: async (req, res) => {
        try {
            let productToSearch = req.query.productSearch;

            let productSearched = await db.Product.findAll( {order:[['name','ASC']],
                where: { [Op.or]: [ {name: { [Op.like]: '%' + productToSearch + '%' }}]}
                });

            let allProducts = await db.Product.findAll()

            if(productSearched.length === 0){ // logica cuando no se encuentra el usuario
                let notFound = [];
                let error = { notFound :{
                    msg: "No hay productos con estas características"
                }};
                console.log(error);
                return res.render('./admin/inventory-products', {errors: error, products: allProducts});
            }
                return res.render('./admin/inventory-products', { products: productSearched });

        } catch (error) {
            console.error(error)
        }

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
    searchUser: async (req, res) => {

        try {
            let userSearched = await User.search(req.query.fuckingBug); // encuentra un usuario por su PK

            let allUsers = await User.all(); // llama a todos los usuarios

            if(userSearched.length === 0){ // logica cuando no se encuentra el usuario

                let usernotFound = [];

                let error = { notFound :{
                    msg: "No hay un usuario con estas características"
                }};

                console.log(error);

                return res.render('./admin/inventory-users', {errors: error, users: allUsers});
            }

                return res.render('./admin/inventory-users', { users: userSearched });

        } catch (error) {
            console.error(error)
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
            req.body.image = req.file ? req.file.filename : userData.image; // si hay una nueva imagen se agrega al body, si no, se agrega la anterior

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
            console.log(req.body);

            await User.updateAddressbyID(updateData, req.body.address); // si pasa por aca es porque ya existe una fila en addresses y simplemente la actualiza
        }
            

    
            return res.redirect(303, 'perfil');
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
    },
    deleteAddress:  async (req, res) => {
        let userID = req.params.id;
        let addressID = req.body.addressid;
try {
    await User.deleteAddress(addressID, userID);
    return res.redirect(`/admin/${req.params.id}/editar-usuario`);
    
} catch (error) {
    
}
    },
    inventoryNewsletter: async (req, res)=> {
        try {
            let newsletter = await db.Newsletter.findAll();
            //return res.send({newsletter});
            return res.render ('./admin/inventory-newsletter', {newsletter})
    }
    catch(error){
        console.error(error);
        }
    },
    deleteNewsletter: async (req, res) => {
        try{
            await db.Newsletter.destroy({where: {id: req.params.id}});
            return res.redirect('/admin/inventario-newsletter');
        }
        catch(error){
            console.error(error);
        }
    }

}


module.exports = adminController;