const router = require("../routes/products");
const path = require('path');

const productsController = {
    list: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/products/index'));
    },
    abm: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/products/abm'));
    },
    detail: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/products/detail'));
    },
    cart: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/products/cart'));
    }
};

module.exports = productsController;