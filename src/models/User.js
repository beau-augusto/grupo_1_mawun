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
            association: "addresses",
            attributes: {exclude:["id", "user_id"]}
    }],
            attributes: {exclude:["role_id"]},
            raw: true,
            nested: true
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
                association: "addresses",
                attributes: {exclude:["id", "user_id"]}
        }],
                attributes: {exclude:["role_id"]},
                raw: true,
                nested: true
            })  
    },
    search: function(text) {
       return  db.User.findAll({
            order:[['name','ASC']],
            include: [{
                association: "roles",
                attributes: ["name"]
        },
        {
            association: "addresses",
            attributes: {exclude:["id", "user_id"]}
    }],
            attributes: {exclude:["role_id"]},
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
    create: function(userData) {
        return db.User.create(userData)
    },
    update: function(userData, ID) {
       return db.User.update(userData,
            {where: {id: ID}
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