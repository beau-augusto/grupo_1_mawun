module.exports = function (sequelize, dataTypes){

    let alias = "Tag_type";

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
        tableName: "Tag_type",
        timestamps: false
    }

    let Tag_type = sequelize.define(alias, cols, config);

    Tag_type.associate = function (models) {
        Tag_type.hasMany(models.Product_tag, {
            as: "tagtype",
            foreignKey: "tag_type_id"

        })

    }

    return Tags_type
}    