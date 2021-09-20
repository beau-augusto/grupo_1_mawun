

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
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
      
        Product.belongsToMany(models.Order, {
            as: "orders",
            through: "product_order",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: false
        })

        Product.belongsToMany(models.Tag, {
            as: "tags",
            through: "product_tags",
            foreignKey: "product_id",
            otherKey: "tag_type_id",
            //otherKey: "tag_name_id", // dudo de esta 
            timestamps: false
        })

    }

    return Product
}

