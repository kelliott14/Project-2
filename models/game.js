module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

            }
        },
        draft_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {

            }
        },
        game_length: {
            //unsure about this sequelize data type - need to check docs
            type: DataTypes.TIMESTAMP,
            allowNull: false,
            validate: {

            }
        }
    });
    return Game;
};