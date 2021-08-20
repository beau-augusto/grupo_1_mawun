const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: (req, res)=> {
        const recommendedProducts = products.filter((product) => product.recommended == 1);
        const viewData = {
            recommendeds: recommendedProducts
        }
        res.render ('index', viewData );
    },
    contact: (req, res)=> {
        res.render ('contact');
    },
    aboutUs: (req, res)=> {
        res.render ('about-us');
    }
    
};

module.exports = mainController;