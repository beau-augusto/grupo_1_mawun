module.exports = function (sequelize, dataTypes){

    let alias = "Tags_type";

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
        tableName: "Tags_type",
        timestamps: false
    }

    let Tags_type = sequelize.define(alias, cols, config);

    Tags_type.associate = function (models) {
        Tags_type.hasMany(models.Products_tags, {
            as: "tag_type_products_tags",
            foreignKey: "tag_type_id"

        })

    }

    return Tags_type
}    