module.exports = function (sequelize, dataTypes){

    let alias = "Tags_name";

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
        tableName: "Tags_name",
        timestamps: false
    }

    let Tags_name = sequelize.define(alias, cols, config);

    Tags_name.associate = function (models) {
        Tags_type.hasMany(models.Products_tags, {
            as: "tag_name_products_tags",
            foreignKey: "tag_name_id"

        })

    }

    return Tags_name
}    