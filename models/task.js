/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      // validate: {

      // }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {

      // }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {

      // }
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
      // validate: {

      // }
    }
  });
  return Task;
};
