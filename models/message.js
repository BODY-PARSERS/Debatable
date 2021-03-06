
module.exports = function (sequelize, DataTypes) {

    var Message = sequelize.define("Message", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,2000]
            }
        },
    });

    Message.associate = function (models) {
        Message.belongsTo(models.User, 
            { foreignKey: 'user_id', targetKey: 'id' }
        );
        Message.belongsTo(models.Debate,
            { foreignKey: {name:'debate_id', allowNull:true}, targetKey: 'id' }
        );
    };

    return Message;

};