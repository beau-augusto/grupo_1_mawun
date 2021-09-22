module.exports = (sequelize, dataTypes) =>{

    let alias = "Winery";

    cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(100),
        },
        description: {
            type: dataTypes.TEXT,

        },
        image: {
            type: dataTypes.STRING(50),
        },
        product_id: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: 'wineries',
        timesTamps: false
    };

    const Winery = sequelize.define(alias, cols, config);

    Winery.associate = function (models) {

        Winery.hasMany(models.Product,{
            as: "products",
            foreignKey: "winery_id"
        })
    };

    return Winery;
}

