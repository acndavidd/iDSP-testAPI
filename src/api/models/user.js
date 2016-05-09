'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userID: DataTypes.INTEGER,
    password: DataTypes.STRING(200),
    roleID: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    status: DataTypes.CHAR(1)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsTo(models.Role)
      }
    }
  });
  return User;
};