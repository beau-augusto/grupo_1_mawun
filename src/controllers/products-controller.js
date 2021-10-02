const fs = require('fs');
const path = require('path');

//Sequelize Models//
const db = require("../database/models");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    list: (req, res)=> {
        db.Product.findAll({ order:[['name','ASC']]})
            .then(function (products){
                res.render ('products/index', {products:products});
            })
    },
    detail: (req, res)=> {
        db.Product.findByPk(req.params.id, { include:[
            {association:'winery'}, 
            {association:'product_tag', include:[{association:'tag_types'}, {association:'tags'}]} 
        ],})
            .then(function (product){
                if (product){

                let categories = product.product_tag.filter((tag) => tag.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = categoria
                categories = categories.map(v => v.tags.name) //Relaizó un map para obtener unicamente los nombres

                let varietals = product.product_tag.filter((tag) => tag.tag_types.name == 'Varietal'); //Filtro la association de product tag por el nombre = Varietal
                varietals = varietals.map(v => v.tags.name)//Relaizó un map para obtener unicamente los nombres 

                product.dataValues.categories = categories; //sumo al array de productos la categorias previamente mapeada
                product.dataValues.varietals  = varietals ; //sumo al array de productos la varietales previamente mapeada
                res.render ('products/detail', {product:product});
                }else{
                res.send ('El producto que buscás no existe.')
                } 
            });
    },
    cart: (req, res)=> {
        res.render ('products/cart');
    },
};

module.exports = productsController;