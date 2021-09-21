module.exports = function (sequelize, dataTypes){

    let alias = "Product_tag";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }

    let config = {
        tableName: "product_tags",
        timestamps: false
    }

    const Product_tag = sequelize.define(alias, cols, config);

    Product_tag.associate = function (models) {
        Product_tag.belongsTo(models.Tag_type, {
            as: "tag_types",
            foreignKey: "tag_type_id"

        })
    }

    return Product_tag;
}    