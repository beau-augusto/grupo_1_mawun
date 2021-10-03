module.exports = function (sequelize, dataTypes){

    let alias = "Tag";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
    };

    let config = {
        tableName: "tags",
        timestamps: false
    };

    const Tag = sequelize.define(alias, cols, config);

    Tag.associate = function (models) {
        Tag.belongsToMany(models.Product, {
            as: "products",
            through: "product_tags",
            foreignKey: "tag_id",
            otherKey: "product_id",
            timestamps: false
        })

        Tag.belongsTo(models.Tag_type,{
            as: "tag_types",
            foreignKey: "tag_type_id"
        })
    };
    return Tag;
}