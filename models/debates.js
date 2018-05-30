module.exports = function (sequelize, DataTypes) {

    var Debate = sequelize.define("Debate", {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        user1_votes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user2_votes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Debate.associate = function (models) {
        Debate.hasMany(models.Message, 
            {foreignKey:'debate_id', sourceKey:'id'}
        );
        Debate.belongsToMany(models.User,
        {through: 'UserDebate'}
        );
    };

    return Debate;
};