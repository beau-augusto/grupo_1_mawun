module.exports = (sequelize, dataTypes) => {
    let alias = "Order"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        date_created: {
            type: dataTypes.DATE
        } ,
        status: {
            type: dataTypes.INTEGER,
        },
        total: {
            type: dataTypes.DECIMAL,
        },
        user_id:{
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: "orders",
        timestamps: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsToMany(models.Product, {
            as: "products",
            through: "order_products",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false
        })

        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        })

      Order.hasMany(models.Order_product,{
            as: "orders_product",  // **chequear**
            foreignKey: "order_id"
        })
    };

    return Order;
}
