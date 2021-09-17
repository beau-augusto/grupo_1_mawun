module.exports = function (sequelize, dataTypes){

    let alias = "Products_tags";

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
    }

    let config = {
        tableName: "Products_tags",
        timestamps: false
    }

    let Products_tags = sequelize.define(alias, cols, config);

    Products_tags.associate = function (models) {
        Products_tags.belongsTo(models.Product, {
            as: "Products_products_tags",
            foreignKey: "product_id"

        }),
        Products_tags.belongsTo(models.Tags_type, {
            as: "Products_tags_tags_type",
            foreignKey: "tag_type_id"

        }),
        Products_tags.belongsTo(models.Tags_name, {
            as: "Products_tags_tags_name",
            foreignKey: "tag_name_id"

        })


    }

    return Products_tags
}    