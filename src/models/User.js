// Modelo de lógica para laburar con la base de datos de

const db = require('../database/models'); // Llamo los models de la base de datos en SQL
const { Op } = require("sequelize");

const User = {
    all: function() {
       return db.User.findAll({
            order:[['name','ASC']],
            include: [{
                association: "roles",
                attributes: ["name"]
        },
        {
            association: "addresses"
    }]
        })
},
    findPK: function (PK) {
         return   db.User.findByPk(PK, {
                order:[['name','ASC']],
                include: [{
                    association: "roles",
                    attributes: ["name"]
            },
            {
                association: "addresses"
        }]
            })  
    },
    findByEmail: function (email) {
        return   db.User.findOne({
            where: {email: email},
            include: [{
                association: "roles",
                attributes: ["name"]
        },
        {
            association: "addresses"
    }]
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
            where: {
                [Op.or]: [
                 {name: { [Op.like]: '%' + text + '%' }},
                 {last_name: { [Op.like]: '%' + text + '%' }},
                 {email: { [Op.like]: '%' + text + '%' }}
                ]
              }
            })  
     },
    create: function(userData) {
        return db.User.create(userData)
    },
    update: function(userData, ID) {
       return db.User.update(userData,
            { 
            where: {id: ID}
        });
    },
    updateAddress:  function(userData, ID) {
        return db.Address.update(userData,
             {
             where: {user_id: ID}
         });
     },
     updateAddress1:  function(userData) {
        return db.Address.update(userData);
     },
     updateAddressbyID:  function(userData, ID) {
        return db.Address.update(userData,
             {
             where: {id: ID}
         });
     },
     createAddress:  function(userData, userID) {
        return db.Address.create({...userData, user_id: userID});
     },
     deleteAddress: function(ID, userID) {
        return db.Address.destroy({
             where: {
                 id: ID,
                 user_id: userID
             }
         });
     },
    delete: function(ID) {
       return db.User.destroy({
            where: {
                id: ID,
            }
        });

    }
}

module.exports = User