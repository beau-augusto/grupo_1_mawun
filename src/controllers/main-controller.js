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
    index: (req, res)=> {
        db.Product.findAll({raw:true})
            .then(function (products){
                const recommendedProducts = products.filter((product) => product.recommended == 1);
                const viewData = {
                    recommendeds: recommendedProducts
                    }
              return  res.render ('index', viewData );
            })

        
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
            if (resultValidation.isEmpty()){
                db.Newsletter.create({
                    email: req.body.email
                });
    
            return res.redirect (303, '/'); //Codigo 303, redirecciona a la ruta se desee 
            } else {
                return res.render ('/', { 
                    errors: resultValidation.mapped(), 
                }); 
            };

        } catch(error){
            console.error(error)
        }


        
        
        
    }
}

module.exports = mainController;