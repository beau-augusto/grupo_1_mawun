const router = require("../routes/main");
const path = require('path');

const mainController = {
    index: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/index'));
    },
    cart: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/cart'));
    }
};

module.exports = mainController;