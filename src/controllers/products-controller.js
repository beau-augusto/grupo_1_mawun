const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    list: (req, res)=> {
        const viewData = {
            products: products
        };
        res.render ('products/index', viewData);
    },
    abm: (req, res)=> {
        res.render ('products/abm');
    },
    detail: (req, res)=> {
        res.render ('products/detail');
    },
    cart: (req, res)=> {
        res.render ('products/cart');
    }
};

module.exports = productsController;