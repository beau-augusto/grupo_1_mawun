// Modelo de lógica para laburar con la base de datos de

const db = require('../database/models'); // Llamo los models de la base de datos en SQL
const Address = require('../database/models/Address');

const User = {
    findAll: (req, res) => {
        db.User.findAll({
            include: ["roles"],
            raw: true
        }).then(function (users) {
            console.log((users));    
        
    })
    .catch(err => {console.log(err)}) // agarra el error
},
    findUser: function(){
            db.User.findByPk().then(function (users) {
        console.log((users)); 
    });
    },
    create: function(userData) {


    },
    delete: function(userData) {


    }
}

console.log(User.findUser(0));

// (req, res) => {
//     db.User.findByPk().then(function (users) {
//         console.log((users)); 
//     });
// },