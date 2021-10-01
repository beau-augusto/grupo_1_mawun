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

        /* Tag.hasMany(models.Product_tag,{
            as: "products_tags",
            foreignKey: "tag_id"
        }) */
    };
    return Tag;
}