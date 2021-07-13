const router = require("../routes/users");
const path = require('path');

const usersController = {
    register: (req, res)=> {
        res.render ('users/register');
    },
    login: (req, res)=> {
        res.render ('users/login');
    }
};

module.exports = usersController;