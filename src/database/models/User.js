module.exports = (sequelize, dataTypes) =>{
    let alias = 'User';

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
        last_name: {
            type: dataTypes.STRING(50),
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
        },
    };
    
    let config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){

        User.belongsTo(models.Role,{
            as: "roles",
            foreignKey: "role_id"
        })

        User.hasMany(models.Address,{
            as: "addresses",
            foreignKey: "user_id"
        })
    };
    return User;
}
