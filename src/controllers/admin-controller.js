const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const adminController = {
    create: (req, res)=> {
        res.render ('admin/create-product');
    },

    edit: (req, res)=> {
        const id = req.params.id; // Obtengo el parámetro para buscar el recurso
		const product = products.find((prod) => prod.id == id); // Busco si esta el pruducto
		if (!product) {
			return res.send('No pudimos encotrar ese Producto')
		}
		const viewData = {
			product: product
		}
        return res.render ('admin/edit-product', viewData);
    },

    update: (req, res) => {
        const indexProduct = products.findIndex( product => product.id == req.params.id); //Busco el indice del pruducto en el array con el id recibido por el accion del formulario

        products[indexProduct] = { ...products[indexProduct] , ...req.body };

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		res.redirect(303, '/productos/inventario');
	}, 

    store: (req, res)=> {
        //asignarle ID en base al ultimo producto
        const lastProduct = products [products.lenght - 1];

        const productToCreate = req.body;
        productToCreate.id = lastProduct.id + 1;
        productToCreate.image = 'buenalma.jpg';

        //Para agregar un nuevo producto en el array del Json
        products.push(productToCreate);

        //llama al metodo fs.writeFileSync(GUARDAR UN ARCHIVO) y el contenido de ese archivo
        //va a ser => la ruta donde lo voy a guardar y el contenido va a ser JSON.stringify
        //xq json.stringify, porque ahora tengo datos de js y los tengo que volver a parsear a JSON 
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

        //Codigo 303, redirecciona a la ruta que escribas
        res.redirect (303, '/admin/inventario');
    },
    inventory:  (req, res)=> {

        res.render ('./admin/inventory', {products});
    },
    delete: 
    (req, res)=> {

        
        res.render ('./admin/inventory', {products});
    }
};

module.exports = adminController;