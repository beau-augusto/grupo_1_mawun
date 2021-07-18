const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const adminController = {
    create: (req, res)=> {
        res.render ('admin/create-product');
    },
    edit: (req, res)=> {
        res.render ('admin/edit-product');
    },
    update: (req, res) => {
		res.send ('HOLA')
	}
};

module.exports = adminController;