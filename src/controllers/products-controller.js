const fs = require('fs');
const path = require('path');

//Sequelize Models//
const db = require("../database/models");
const Order = require("../models/Order");
const User = require("../models/User");
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

                //return res.send ({product});
                return res.render ('products/detail', {product});
                }else{
                return res.send ('El producto que buscás no existe.');
                }
            
        } catch (error) {
            console.error(error);
        };
    },
    categoryList: async (req, res)=> {

        let selectedCategory = req.params.category

        try{
            let categoryList = await db.Product.findAll({include:[
                {association:'product_tag'}]});

            return res.send ({categoryList, selectedCategory});

            if (categoryList){
                let categories = product.product_tag.filter((tag) => tag.tag_types.name == 'Categoria'); //Filtro la association de product tag por el nombre = categoria
                categories = categories.map(v => v.tags.name) //Relaizó un map para obtener unicamente los nombres
                product.dataValues.categories = categories; //sumo al array de productos la categorias previamente mapeada
                res.render ('products/category-list', {categories});
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
        
     //  console.log({orders: carrito, sum:sum});  
        return res.render ('products/cart', {orders: carrito, sum:sum}); // le paso los dato de cada producto y tambien la suma de todos los productos

        } catch (error) {
            console.error(error);
        }

    },
    addToCart: async (req, res)=> {
        try {

            let previousOrder = await Order.all(res.locals.usuarioLogeado.id) // encuentro la orden previa no finalizada

            if (previousOrder){ // si existe creo una nueva associacion con ese numero de orden en la table pivote

                let products = await Order.carrito(res.locals.usuarioLogeado.id) ;
  
                let productDuplicado = products.find(product => product.product_id === Number(req.params.id)) // busco si hay duplicado
             //  return res.send(productDuplicado)

              if(productDuplicado){
                  let quantity = productDuplicado.quantity + Number(req.body.sumador ? req.body.sumador : 1);
                  Order.updateQuantity(quantity, productDuplicado.id) 
                  return res.redirect('/productos')
              } else{
                let associationData = { // arma el objeto para crear una fila en la table order_product
                    quantity: req.body.sumador ? req.body.sumador : 1, // si no tiene cantidad, se toma 1 por defecto
                    product_id: req.params.id, // toma el id del producto
                    order_id: previousOrder.id // toma el id del order recien creado 
                }
                
             await Order.createAssociation(associationData) // un metodo para crear en la table pivote
              return res.redirect('/productos')

              }


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
    continuar: async (req, res) => {

        if(req.params.id == " "){
            return res.redirect('/productos/carrito')     
        } else {
            
            let orderId = (req.params.id)
    try {
        let userData = await User.findByEmail(res.locals.usuarioLogeado.email)

       return res.render('products/order-address', {user: userData, orderId: orderId})
        
    } catch (error) {
        
    }

        }  
        

    },
    alPago: async (req, res) => {
        
        
        try {
            
            
            let orderId = (req.params.id);
            if(req.body.calle_numero != '' && req.body.codigo_postal != ''){
            let newAddress = {
                street: req.body.calle_numero,
                apartment: req.body.departamento,
                district: req.body.barrio,
                zip_code: req.body.codigo_postal,
                city: req.body.ciudad,
                state: req.body.provincia
            }
            await User.createAddress(newAddress, 3); // crea una nueva fila en addresses que corresponde al usuario ya existente

        } else {
    
            let idAddress = req.body.address
    
         
        }
        return res.render('products/payment', {orderId: orderId})


            
        } catch (error) {
            
        }


        
    },
    comprar: async (req, res) => {
        try {
            let orderId = (req.params.id)
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
    updateQuantity: async function (req, res) {
     await Order.updateQuantity(req.query.sumador, req.params.id)
        return res.redirect('/productos/carrito');
    }
};

module.exports = productsController;