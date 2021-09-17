module.exports = function (sequelize, dataTypes){

    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        recommended: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.hasMany(models.Orders_products, {
            as: "order_products",
            foreignKey: "product_id"

        })
        Product.hasMany(models.Products_tags, {
            as: "Product_tags",
            foreignKey: "product_id"

        })

    }

    return Product
}