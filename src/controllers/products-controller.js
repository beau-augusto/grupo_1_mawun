const fs = require('fs');
const path = require('path');

//Sequelize Models//
const db = require("../database/models");


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
    list: (req, res)=> {
        db.Product.findAll( {order:[['name','ASC']]}, { include: ['winery']})
            .then(function (products){
                res.render ('products/index', {products:products});
            })
    },
    detail: (req, res)=> {
        db.Product.findByPk(req.params.id, { include: [{association:'winery'}, {association:'tags'}]}, {raw:true}, {nest:true})
            .then(function (product){
                if (product){
                res.render ('products/detail', {product});
                }else {
                res.send ('El producto que buscás no existe.')
                }
            });
    },
    cart: (req, res)=> {
        res.render ('products/cart');
    },
};

module.exports = productsController;