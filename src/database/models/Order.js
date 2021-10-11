module.exports = (sequelize, dataTypes) => {
    let alias = "Order"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            field: 'created_at',
            type: dataTypes.DATE,
        },
        status: {
            type: dataTypes.INTEGER,
        },
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "orders",
        updatedAt: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsToMany(models.Product, {
            as: "products",
            through: "order_products",
            foreignKey: "order_id",
            otherKey: "product_id"
        })

        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        })

        Order.hasMany(models.Order_product,{
            as: "order_product",   //** chequear **
            foreignKey: "order_id"
        })

    };

    return Order;
}
