module.exports = (sequelize, DataTypes) => {
    let alias = "Order"

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        date_created: {
            type: DataTypes.DATE
        } ,
        status: {
            type: DataTypes.INTEGER,
        },
        total: {
            type: DataTypes.DECIMAL,
        },
        user_id:{
            type: DataTypes.INTEGER,
        }
    };

    let config = {
        tableName: "orders",
        timestamps: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.hasMany(models.Order_product, {
            as: "products_order",
            foreignKey: "order_id"
        }),
        Order.belongsTo(models.User, {
            as: "user_orders",
            foreignKey: "user_id"
        })
    };

    return Order;
}
