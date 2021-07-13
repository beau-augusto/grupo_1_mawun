const router = require("../routes/main");
const path = require('path');

const mainController = {
    index: (req, res)=> {
        res.render ('index');
    },
    contact: (req, res)=> {
        res.render ('contact');
    },
    aboutUs: (req, res)=> {
        res.render ('about-us');
    }
    
};

module.exports = mainController;