const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const adminController = {
    create: (req, res)=> {
    return res.render ('admin/create-product');
    }, 
    store: (req, res)=> {
//asignarle ID en base al ultimo producto
        const lastProduct = products (products.lenght - 1)

        const productToCreate = req.body;
        productToCreate.id = lastProduct.id + 1;

//Para agregar un nuevo producto en el array del Json
        product.push(productToCreate);

//llama al metodo fs.writeFileSync(GUARDAR UN ARCHIVO) y el contenido de ese archivo
//va a ser => la ruta donde lo voy a guardar y el contenido va a ser JSON.stringify
//xq json.stringify, porque ahora tengo datos de js y los tengo que volver a parsear a JSON 
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

//Codigo 303, redirecciona a la ruta que escribas
        res.redirect (303, '/');
    },
    inventory:  (req, res)=> {

        res.render ('products/inventory', {products});
    }
};

module.exports = adminController;