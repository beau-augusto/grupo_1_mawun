const db = require('../database/models'); // Llamo los models de la base de datos en SQL
const { Op } = require("sequelize");

const Order = {
all: function(userID) {
       return db.Order.findOne({ where: {user_id: userID, status: 0}
    })
},
carrito: function(userID) {
    return db.Order_product.findAll({
        include:[
            {association:'products', include:[{association:'winery'}]}, {association:'orders',
        where: {user_id: userID, status: 0}}
        ]
})
},
deleteCarrito: function (orderID){
    return db.Order.destroy({
        where: {id: orderID}}  
)
},
comprar: function (userID){
    return db.Order.findAll({
        where: {user_id: userID, status: 0}
})
},
updateQuantity: function (quantity){
    return db.Order_product.upsert({

    })

},
comprar1: function(userID) {
    return db.Order.update({status: 1},{
          where: {user_id: userID, status: 0}
     });
    },
changeState: function (userID){
    return db.Order.findAll({
        where: {user_id: userID, status: 0}
})
},
all1: function() {
    return db.Order.findAll({limit: 1, order: [["created_at", "DESC"]], raw:true})
},
allbyUser: function(userID) {
    return db.Order.findAll({
        where: {user_id: userID},
        include: [{association: "users"}, {association:'items_carrito', include:[{association:'products'}]}, {association: "products"}], raw:true
     })
},
    findPK: function (PK) {
         return   db.Order.findByPk(PK, {
            include: [{association: "products"}, {association: "users"}, {association: "items_carrito"}],
            raw: true,
            nested: true
        })
    },
    findone: function () {
        return   db.Order.findOne({order: [["created_at", "DESC"]], raw:true})  
   },
    findByUser: function (userID) {
        return   db.Order.findOne({
            include: [{association: "products"}, {association: "users"}, {association: "items_carrito"}],
            raw: true,
            nested: true,
            where: {user_id: userID}
   })
},
    search: function(text) {
       return  db.User.findAll({
            order:[['name','ASC']],
            include: [{
                association: "roles"
        },
        {
            association: "addresses"
    }],
            raw: true,
            nested: true,
            where: {
                [Op.or]: [
                 {name: { [Op.like]: '%' + text + '%' }},
                 {last_name: { [Op.like]: '%' + text + '%' }},
                 {email: { [Op.like]: '%' + text + '%' }}
                ]
              }
            })  
     },
    create: function(orderData) {
        return db.Order.create(orderData)
    },
    createAssociation: function(data) {
        return db.Order_product.create(data);
    },
    update: function(userData, ID) {
       return db.User.update(userData,
            { include: [{association: "roles"}],
            where: {id: ID}
        });
    },
    updateAddress:  function(userData, ID) {
        return db.Address.update(userData,
             {
             where: {user_id: ID}
         });
     },
     createAddress:  function(userData) {
        return db.Address.create(userData);
     },
    delete: function(ID) {
       return db.User.destroy({
            where: {
                id: ID,
            }
        });

    }
}


module.exports = Order