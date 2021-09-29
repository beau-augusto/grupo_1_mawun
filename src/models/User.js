// Modelo de lógica para laburar con la base de datos de

const db = require('../database/models'); // Llamo los models de la base de datos en SQL
const { Op } = require("sequelize");

const User = {
    allUsers: function() {
        db.User.findAll({
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
        }).then((resultado) => {
           return console.log(resultado);    
        
    })
    .catch(error => {console.log(error)}) // agarra el error
},
    findUser: function (PK) {
            db.User.findByPk(PK, {
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
            .then((resultado) => {
                return console.log(resultado); 

    })
    .catch(error => {console.log(error)}) // agarra el error
    },
    searchName: function(text) {
        db.User.findAll({
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
        }).then((resultado) => {
           return console.log(resultado);    
        
    })
    .catch(error => {console.log(error)}) // agarra el error
    },
    create: function(userData) {
        db.User.create(userData)
    },
    update: function(userData, ID) {
        db.User.update(userData,
            {where: {id: ID}
        });

    },
    delete: function(ID) {
        db.User.destroy({
            where: {
                id: ID,
            }
        });

    }
}

module.exports = User