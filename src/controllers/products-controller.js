const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    list: (req, res)=> {
        res.render ('products/index', {products});
    },
    detail: (req, res)=> {
        const elProducto = products.find(producto => producto.id == req.params.id) 
        if (elProducto != undefined){
        res.render ('products/detail', elProducto);
    } /*  
        if (!req.params.id) {
            const recommendedProducts = products.filter((product) => product.recommended == true);
            const viewData = {
                recommendeds: recommendedProducts
            }
            res.render ('index', viewData);
    }  */  else {
        res.send ('El producto que buscás no existe. Lo lamento mucho. Muajaja.')
    }
    },
    cart: (req, res)=> {
        res.render ('products/cart');
    },
};

module.exports = productsController;