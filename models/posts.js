
module.exports = function (sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,250]
            }
        },
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, 
            { foreignKey: 'user_id', targetKey: 'id' }
        );
        Post.belongsTo(models.Debate,
            { foreignKey: 'debate_id', targetKey: 'id' }
        );
    };

    return Post;

};