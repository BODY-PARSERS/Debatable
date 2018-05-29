
module.exports = function(sequelize, DataTypes){

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        wins:{
            type: DataTypes.INT,
            allowNull: false,
            defaultValue: 0
        },
        losses: {
            type: DataTypes.INT,
            allowNull: false,
            defaultValue: 0
        }
    })

    User.associate = function (models) {
        User.hasMany(models.Post, 
        { foreignKey: 'user_id', sourceKey: 'id' }
        )
        User.belongsToMany(models.Debate,
        { through: 'UserDebate' }
        );
    };


    return User;

};