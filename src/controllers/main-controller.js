const { raw } = require('express');
const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require("../database/models");


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
    }
    
};

module.exports = mainController;