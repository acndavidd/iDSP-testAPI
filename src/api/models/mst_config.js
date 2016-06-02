'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_config = sequelize.define('mst_config', {
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(200),
    value: DataTypes.STRING(200),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return mst_config;
};