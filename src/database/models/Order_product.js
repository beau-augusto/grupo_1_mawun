module.exports = function (sequelize, dataTypes){

    let alias = "Order_products";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        product_id: {
            type: DataTypes.INTEGER,
        },
        order_id: {
            type: DataTypes.INTEGER,
        }
    };

    let config = {
        tableName: "order_products",
        timestamps: false
    };

    const Order_product = sequelize.define(alias, cols, config);

    Order_product.associate = function (models) {

        Order_product.belongsTo(models.Ordes, {
            as: "products_order",
            foreignKey: "order_id"
        }),

        Order_product.belongsTo(models.Product, {
            as: "products_orders",
            foreignKey: "product_id"
        })        
    };

    return Order_product;
}    