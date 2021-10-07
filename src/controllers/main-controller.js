const { raw } = require('express');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require("../database/models");


//const emailFilePath = path.join(__dirname, '../data/newsletterDataBase.json'); // Ruta donde se encuentra la DB
//const emails = JSON.parse(fs.readFileSync(emailFilePath, 'utf-8')); // Cambio el formato Json a un array de productos

const mainController = {
    index: async (req, res)=> {
        try{
            let product = await db.Product.findAll( {where: {recommended: 1}}) //Consulta a la Db listado de Productos
             
            return  res.render ('index', {product} );

        } catch (error) {
            console.error(error);
        } 
    },
    contact: (req, res)=> {
        res.render ('contact');
    },
    aboutUs: (req, res)=> {
        res.render ('about-us');
    },
    newsletterCreate: async (req, res)=> {
        try{
            const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error
console.log(resultValidation);

if (resultValidation.isEmpty()){
    db.Newsletter.create({
        email: req.body.email
    });
return res.redirect (303, '/'); //Codigo 303, redirecciona a la ruta se desee 
} else {

    db.Product.findAll({raw:true})
    .then(function (products){
        const recommendedProducts = products.filter((product) => product.recommended == 1);
        
        return res.render ('index', { 
            errors: resultValidation.mapped(), 
            recommendeds: recommendedProducts
        });  
        })
    
};

        } catch(error){
            console.error(error)
        }


        
        
        
    }
}

module.exports = mainController;