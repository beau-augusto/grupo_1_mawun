const router = require("../routes/users");
const path = require('path');

const usersController = {
    register: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/users/register'));
    },
    login: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/users/login'));
    }
};

module.exports = usersController;