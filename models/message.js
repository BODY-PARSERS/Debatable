
module.exports = function (sequelize, DataTypes) {

    var Message = sequelize.define("Message", {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,250]
            }
        },
    });

    Message.associate = function (models) {
        Message.belongsTo(models.User, 
            { foreignKey: 'user_id', targetKey: 'id' }
        );
        Message.belongsTo(models.Debate,
            { foreignKey: 'debate_id', targetKey: 'id' }
        );
    };

    return Message;

};