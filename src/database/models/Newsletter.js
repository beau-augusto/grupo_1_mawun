module.exports = function (sequelize, dataTypes){

    let alias = "Newsletters";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    };

    let config = {
        tableName: "newsletter",
        timestamps: false
    };

    let Newsletter = sequelize.define(alias, cols, config);

    return Newsletter;
}    