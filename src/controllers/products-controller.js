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
            //let test = carrito.map(item => console.log(item.dataValues.order_product)) // agarro los items de order_products
         
        let carrito = ordenes.map(item => {return {
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
            
        //let quantities = carrito.map(item => item.quantity)
        //let quantity = itemsCarrito.map((item) => item.quantity)
        //let product = itemsCarrito.map((item) => item.products)
        //let bodega = itemsCarrito.map((item) => item.products.winery.name)
        //let products = itemsCarrito.map(((product) => product.products))
        //let test = itemsCarrito.map((item) => ({...item.products, quantity: item.quantity})) 
        //let datos = carrito.map(item => item.items_carrito.id)
        //name: item.items_carrito.products.name, price: item.items_carrito.products.price, image: item.items_carrito.products.image, winery_id: item.items_carrito.products.winery_id
        //return res.send(carrito)
        // let product = itemsCarrito.map((item) => item.products)
        //let bodega = itemsCarrito.map((item) => item.products.winery.name)
        // let products = itemsCarrito.map(((product) => product.products))
        // let test = itemsCarrito.map((item) => ({...item.products, quantity: item.quantity})) 
        // let datos = carrito.map(item => item.items_carrito.id)
        // name: item.items_carrito.products.name, price: item.items_carrito.products.price, image: item.items_carrito.products.image, winery_id: item.items_carrito.products.winery_id
        // return res.send({orders:carrito})
console.log({orders: carrito, sum:sum});
         return res.render ('products/cart', {orders: carrito, sum:sum}); // le paso los dato de cada producto y tambien la suma de todos los productos

        } catch (error) {
            console.error(error);
        }

    },
    addToCart: async (req, res)=> {
        try {

           let newOrder = await Order.create({user_id: res.locals.usuarioLogeado.id}); // creo una nueva orden con el id de locals en user_id y guardo la orden nueva para luego sacar el ID
        
            let associationData = { // arma el objeto para crear una fila en la table order_product
                quantity: 2, 
                product_id: req.params.id, // toma el id del producto
                order_id: newOrder.id // toma el id del order recien creado 
            }

           await Order.createAssociation(associationData) // un metodo para crear en la table pivote
          return res.redirect('/productos')
        } catch (error) {
            console.log(error);
        }
    },
    deleteCart: async (req, res) => {
        try {
            await Order.deleteCarrito(req.params.id); // borra desde el id de la orden

            return res.redirect('/productos/carrito')
        } catch (error) {
            console.log(error);
        }

    },
    comprar: async (req, res) => {
        try {
            await Order.comprar1(req.params.id)
            return res.render('products/thanks-purchase')
        
        } catch (error) {
            console.log(error);
        }
        
    },
};

module.exports = productsController;