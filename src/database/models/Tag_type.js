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
    };

    let config = {
        tableName: "tag_types",
        timestamps: false
    };

    const Tag_type = sequelize.define(alias, cols, config);

    Tag_type.associate = function (models) {
        Tag_type.belongsToMany(models.Product, {
            as: "products",
            through: "product_tags",
            foreignKey: "tag_type_id",
            otherKey: "product_id",
            timestamps: false
        })
    };

    return Tag_type;
}    