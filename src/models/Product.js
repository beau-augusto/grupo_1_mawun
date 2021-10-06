
const db = require("../database/models");

const Product = {

    findAll: (req, res)=> {
        db.Product.findAll({raw:true})
            .then(function (products){
                res.render ('products/index', {products:products});
            })
    },
    generateId: function (){
        let allUsers = dbUsers;
        let lastUser = allUsers [allUsers.length - 1];
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    
    },

    findPk: function(id){
        return db.Product.findByPk(id, {raw:true})
    },

    findByField: function(field, text){
        let allUsers = dbUsers;
        let userFound = allUsers.find (oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function (userData){
        let allUsers = dbUsers;
        let newUser = {
            id: this.generateId(),
            ...userData
            }
        allUsers.push (newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, 2));
        return newUser;
    },

    delete: function(id){
        let allUsers = dbUsers;
        let finalUsers = allUsers.filter (oneUser => oneUser.id !== id); 
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, 2));
        return true;
    }

}

module.exports = Product;