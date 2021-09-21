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
        },
        price: {
            type: dataTypes.DECIMAL,
        },
        description: {
            type: dataTypes.TEXT,
        },
        recommended: {
            type: dataTypes.INTEGER,
        },
        image: {
            type: dataTypes.STRING,
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
      
        Product.belongsToMany(models.Order, {
            as: "orders",
            through: "order_products",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: false
        })

        Product.belongsToMany(models.Tag, {
            as: "tags",
            through: "product_tags",
            foreignKey: "product_id",
            otherKey: "tag_id",
            timestamps: false
        })

        Product.belongsToMany(models.Tag_type, {
            as: "tag_types",
            through: "product_tags",
            foreignKey: "product_id",
            otherKey: "tag_type_id",
            timestamps: false
        })

        Product.hasMany(models.Order_product,{
            as: "order_products", 
            foreignKey: "product_id"
        })

        /* Product.hasMany(models.Winery,{
            as: "winerys", 
            foreignKey: "product_id"
        }) */

    }

    return Product;
}

