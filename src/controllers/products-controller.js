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
        const elProducto = products.find(producto => producto.id == req.params.id) 
        if (elProducto != undefined){
        res.render ('products/detail', elProducto);
    }  
        if (!req.params.id) {
        res.render ('products/cart');
    }   else {
        res.send ('El producto que buscás no existe. Lo lamento mucho. Muajaja.')
    }
    },
    cart: (req, res)=> {
        res.render ('products/cart');
    }
};

module.exports = productsController;