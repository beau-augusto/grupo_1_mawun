const fs = require('fs');
const path = require('path');

//Sequelize Models//
const db = require("../database/models");
const Order = require("../models/Order");
const Product = require("../models/Product");
const chalk = require('chalk');

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
           let ordenes = await Order.carrito(res.locals.usuarioLogeado.id)  
         
        let carrito = ordenes.map(item => {return {
            association_id: item.id,
            order_id: item.order_id,
            quantity: item.quantity,
            id: item.products.id,
            name: item.products.name,
            price: Number(item.products.price),
            image: item.products.image,
            winery: item.products.winery.name,
            user_id: item.orders.user_id
            }})

        let quantities = ordenes.map(item =>  
            item.quantity * Number(item.products.price) // multiplico la cantidad por el precio de cada producto y lo meto en un array
        )

        let sum = quantities.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)  // sumo todos los numeros en un array
        
      // console.log({orders: carrito, sum:sum});  
        return res.render ('products/cart', {orders: carrito, sum:sum}); // le paso los dato de cada producto y tambien la suma de todos los productos

        } catch (error) {
            console.error(error);
        }

    },
    addToCart: async (req, res)=> {
        try {

            let previousOrder = await Order.all(res.locals.usuarioLogeado.id) // encuentro la orden previa no finalizada

            if (previousOrder){ // si existe creo una nueva associacion con ese numero de orden en la table pibote

                let associationData = { // arma el objeto para crear una fila en la table order_product
                    quantity: req.body.sumador ? req.body.sumador : 1, // si no tiene cantidad, se toma 1 por defecto
                    product_id: req.params.id, // toma el id del producto
                    order_id: previousOrder.id // toma el id del order recien creado 
                }
                
             await Order.createAssociation(associationData) // un metodo para crear en la table pivote
              return res.redirect('/productos')
            } else { // si no hay una orden abierta se crea una nueva 
                let newOrder = await Order.create({user_id: res.locals.usuarioLogeado.id}); // creo una nueva orden con el id de locals en user_id y guardo la orden nueva para luego sacar el ID
               
                let associationData = { // arma el objeto para crear una fila en la table order_product
                    quantity: req.body.sumador ? req.body.sumador : 1, // si no tiene cantidad, se toma 1 por defecto
                    product_id: req.params.id, // toma el id del producto
                    order_id: newOrder.id // toma el id del order recien creado 
                }
          await Order.createAssociation(associationData) // un metodo para crear en la table pivote          
         return res.redirect('/productos')
                
            }
    
        } catch (error) {
            console.log(error);
        }
    },
    deleteCart: async (req, res) => {
        try {
          await Order.deleteCarrito(req.params.id); // borra desde el id de la orden_product
          return res.redirect('/productos/carrito')     
        } catch (error) {
            console.log(error);
        }

    },
    comprar: async (req, res) => {
        try {
            if(req.params.id == " "){
                return res.redirect('/productos/carrito')     
            } else {
                
                await Order.comprar1(req.params.id)
                return res.render('products/thanks-purchase')  
            }  
        } catch (error) {
            console.log(error);
        }
        
    },
};

module.exports = productsController;