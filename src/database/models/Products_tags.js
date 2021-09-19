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
            allowNull: false
        },
    }

    let config = {
        tableName: "Product_tag",
        timestamps: false
    }

    let Product_tag = sequelize.define(alias, cols, config);

    Product_tag.associate = function (models) {
        Product_tags.belongsTo(models.TagType, {
            as: "tagtype",
            foreignKey: "tag_type_id"

        })
    }

    return Products_tags
}    