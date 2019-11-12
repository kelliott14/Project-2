/* eslint-disable camelcase */
module.exports = function (sequelize, DataTypes) {
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
    ends_at: {
      type: DataTypes.DATE,
      allowNull: false
      // validate: {

      // }
    }
  });
  Game.create({
    title: "Test Game",
    draft_status: true,
    ends_at: Date.now()
  });
  return Game;
};
