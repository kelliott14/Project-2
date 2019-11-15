/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var UserGame = sequelize.define("UserGame", {
    game_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
      // validate: {

      // }
    },
    start_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
      // validate: {

      // }
    },
    game_finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
      // validate: {

      // }
    }
  });
  UserGame.associate = function(models) {
    UserGame.belongsTo(models.User, { foreignKey: { allowNull: false } });
    UserGame.belongsTo(models.Game, { foreignKey: { allowNull: false } });
  };
  return UserGame;
};
