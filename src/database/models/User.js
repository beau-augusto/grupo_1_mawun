const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        } ,
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        } ,
        password: {
            type: dataTypes.STRING(10),
            allowNull: false
        } ,
        image: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    };
    
    let config = {
        tableName: 'users',
        timesTamps: false

    }
    const User = sequelize.define(alias, cols, config)

    return User;

}
