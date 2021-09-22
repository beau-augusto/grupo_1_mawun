const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/newsletterDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newsletterController = {
    

};

module.exports = newsletterController;