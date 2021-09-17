module.exports = function (sequelize, dataTypes){

    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50)
        },
        price: {
            type: dataTypes.DECIMAL
        },
        description: {
            type: dataTypes.STRING
        },
        recommended: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    return Product
}    