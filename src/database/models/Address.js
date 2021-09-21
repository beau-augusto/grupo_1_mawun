module.exports = (sequelize, dataTypes) =>{

    let alias = "Address";

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
        user_id: {
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'addresses',
        timesTamps: false
    }

    const Address = sequelize.define(alias, cols, config);

    Address.associate = function (models) {
      
        Address.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
        })

    }

    return Address;
}

