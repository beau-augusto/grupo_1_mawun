const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "Roles";

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
        tableName: 'Roles',
        timesTamps: false
    },

    const Roles = sequelize.define(alias, cols, config);
    return Roles;
}