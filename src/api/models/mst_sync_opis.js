'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_sync_version = sequelize.define('mst_sync_opis', {
    table_name :  {
        type : DataTypes.STRING(50),
        primaryKey : true
    },
    table_description: DataTypes.STRING(200),
    download_sync_version: DataTypes.DATE,
    upload_sync_version: DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_sync_version;
};