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
            let orders = await Order.all(res.locals.usuarioLogeado.id)

            return res.send(orders)
           // return res.render ('products/cart', {orders: orders});
        } catch (error) {
            
        }

    },
    addToCart: async (req, res)=> {
        try {

            let orderData = {
                date_created: Date.now(),
                status: 0,
                user_id: res.locals.usuarioLogeado.id // liga la orden creada con el usuario logeado
            }

            await Order.create(orderData);
        

            let selectedProduct = await Product.findPk(req.params.id); // encuentra el producto selectionado y pasado por params
            let getOrderId = await Order.findone() // encuentra el id de la orden recien creada

            let order_product = {
                quantity: 10,
                product_id: selectedProduct.id,
                order_id: getOrderId.id
            }

           await Order.createAssociation(order_product)
            return res.redirect('/productos')
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = productsController;