'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_sync_version = sequelize.define('mst_sync_version', {
    table_name :  {
        type        : DataTypes.STRING(50),
        primaryKey  : true
    },
    table_description: DataTypes.STRING(200),
    lastSync: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_sync_version;
};