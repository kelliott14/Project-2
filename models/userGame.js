module.exports = function(sequelize, DataTypes) {
    var User_game = sequelize.define("User_game", {
        // how does foreign key work with sequelize models?
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {

            }
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {

            }
        },
        game_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {

            }
        },
        // unsure about this sequelize data type - need to check docs
        start_time: {
            type: DataTypes.DATETIME,
            allowNull: false,
            validate: {

            }
        },
        game_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {

            }
        }
    });
    return User_game;
};