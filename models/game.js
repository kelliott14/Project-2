/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {

      // }
    },
    draft_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      // validate: {

      // }
    },
    game_length: {
      type: DataTypes.INTEGER,
      allowNull: false
      // validate: {

      // }
    }
  });
  return Game;
};
