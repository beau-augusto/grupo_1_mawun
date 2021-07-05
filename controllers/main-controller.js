const router = require("../routes/main");
const path = require('path');

const mainController = {
    index: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/index'));
    },
    contact: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/contact'));
    },
    aboutUs: (req, res)=> {
        res.render (path.resolve(__dirname, '../views/about-us'));
    }
    
};

module.exports = mainController;