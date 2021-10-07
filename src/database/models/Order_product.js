module.exports = function (sequelize, dataTypes){

    let alias = "Order_product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        order_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "order_products",
        timestamps: false
    };

    const Order_product = sequelize.define(alias, cols, config);

    Order_product.associate = function (models) {

        Order_product.belongsTo(models.Order, {
            onDelete: "CASCADE",
            hooks: true,
            as: "orders",
            foreignKey: "order_id"
        }),

        Order_product.belongsTo(models.Product, {
            as: "products",
            foreignKey: "product_id"
        })        
    };

    return Order_product;
}    