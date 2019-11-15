/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define("UserTask", {
    task_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  UserTask.associate = function(models) {
    UserTask.belongsTo(models.User, { foreignKey: { allowNull: false } });
    UserTask.belongsTo(models.Task, { foreignKey: { allowNull: false } });
  };
  return UserTask;
};
