const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) =>{

    let alias = Addresses;

    cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        street:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        zip_code: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        city: {
            type: dataTypes.STRING(10),
            allowNull: false

        },
        state: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    }

    let config = {
        tableName: 'Addresses',
        timesTamps: false
    }

    const Address = sequelize.define(alias, cols, config);
    return Address;
}

