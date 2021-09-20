const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) =>{

    let alias = "Addressssss";

    cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        street:{
            type: dataTypes.STRING(100),
        },
        zip_code: {
            type: dataTypes.STRING(25),
        },
        city: {
            type: dataTypes.STRING(25),

        },
        state: {
            type: dataTypes.STRING(25),
        },
    }

    let config = {
        tableName: 'addresses',
        timesTamps: false
    }

    const Address = sequelize.define(alias, cols, config);

    Address.associate = function (models) {
      
        Address.belongsTo(models.User, {
            as: "users",
            through: "product_order",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: false
        })

        Address.belongsToMany(models.Tag, {
            as: "tags",
            through: "product_tag",
            foreignKey: "product_id",
            otherKey: "tag_type_id",
            // otherKey: "tag_name_id", // dudo de esta 
            timestamps: false
        })

    }

    return Address;
}

