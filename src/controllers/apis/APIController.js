
const db = require('../../database/models');


module.exports = {

    orders:  (req, res) => {

            db.Order_product.findAll({
                include: [{association: 'orders', where: {status: 0, user_id: req.session.usuarioLogeado.id}}]
            })
            .then(orders => {
                let response = {
                    meta: {
                        status: 200,
                        total: orders.length,
                        url: "api/orders"
                    },
                    data: orders
                }
                res.json(response)
            })
            

    },
    addresses:  (req, res) => {

        db.Address.findAll({
        })
        .then(addresses => {
            let response = {
                meta: {
                    status: 200,
                    total: addresses.length,
                    url: "api/addresses"
                },
                data: addresses
            }
            res.json(response)
        })
        

}


}