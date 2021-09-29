const { raw } = require('express');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require("../database/models");


const emailFilePath = path.join(__dirname, '../data/newsletterDataBase.json'); // Ruta donde se encuentra la DB
const emails = JSON.parse(fs.readFileSync(emailFilePath, 'utf-8')); // Cambio el formato Json a un array de productos

const mainController = {
    index: (req, res)=> {
        db.Product.findAll({raw:true})
            .then(function (products){
                const recommendedProducts = products.filter((product) => product.recommended == 1);
                const viewData = {
                    recommendeds: recommendedProducts
                    }
                res.render ('index', viewData );
            })

        
    },
    contact: (req, res)=> {
        res.render ('contact');
    },
    aboutUs: (req, res)=> {
        res.render ('about-us');
    },
    newsletterStore: (req, res)=> {

        const resultValidation = validationResult(req); //Esta variable junto con las validacion, me entraga los campos que tiran un error
        
        if (resultValidation.isEmpty()){

       const lastEmail = emails [emails.length - 1]; //Obtengo el último indice del array

        const addEmail = req.body; //Obtengo la informacion del formulario
        addEmail.id = lastEmail.id + 1; //Agrego el id del Nvo EMAIL agregado

        emails.push(addEmail);
        fs.writeFileSync(emailFilePath, JSON.stringify(emails, null, 2)); // Transformo el nuevo array de productos en Json

        return res.redirect (303, '/'); //Codigo 303, redirecciona a la ruta se desee 
        } else {
            return res.render ('/', { 
                errors: resultValidation.mapped(), 
            }); 
        };
    },
}

module.exports = mainController;