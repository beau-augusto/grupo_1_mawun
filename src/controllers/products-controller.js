const fs = require('fs');
const router = require("../routes/products");
const path = require('path');

const productsController = {
    list: (req, res)=> {
        res.render ('products/index');
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