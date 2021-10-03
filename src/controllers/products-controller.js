const fs = require('fs');
const path = require('path');

//Sequelize Models//
const db = require("../database/models");
const Order = require("../models/Order");
const Product = require("../models/Product");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    list: async (req, res)=> {
        try{
            let products = await db.Product.findAll({ order:[['name','ASC']]})
            return res.render ('products/index', {products});
        } catch (error) {
                console.error(error);
        }
    },
    detail: async (req, res)=> {

        try{
            let product = await db.Product.findByPk(req.params.id, { include:[
                {association:'winery'}, {association:'product_tag', include:[{association:'tag_types'}, {association:'tags'}]} 
            ]});

            if (product){
                let categories = product.product_tag.filter((tag) => tag.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = categoria

                categories = categories.map(v => v.tags.name) //Relaizó un map para obtener unicamente los nombres

                let varietals = product.product_tag.filter((tag) => tag.tag_types.name == 'Varietal'); //Filtro la association de product tag por el nombre = Varietal
                varietals = varietals.map(v => v.tags.name)//Relaizó un map para obtener unicamente los nombres 

                product.dataValues.categories = categories; //sumo al array de productos la categorias previamente mapeada
                product.dataValues.varietals  = varietals ; //sumo al array de productos la varietales previamente mapeada
                res.render ('products/detail', {product:product});
                }else{
                res.send ('El producto que buscás no existe.');
                }
            
        } catch (error) {
            console.error(error);
        };
    },
    cart: async (req, res)=> {
        try {
            
            let orders = await Order.all()
            return res.send(orders)
        } catch (error) {
            
        }

        //res.render ('products/cart');
    },
    addToCart: async (req, res)=> {
        try {
            let orderData = {
                date_created: Date.now(),
                status: 1,
                user_id: 3
            }
            let test = await Product.findPk(req.params.id)
            console.log(test);
            console.log("llega hasta aqui");

            await Order.create(orderData)
            let association = {
                quantity: 2,
                product_id: test.id,
                order_id: 3
            }
           await Order.createAssociation(association)
            return res.redirect('/productos')
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = productsController;