'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_sync_dsp = sequelize.define('mst_sync_dsp', {
    dsp_id: DataTypes.STRING(20),
    download_sync_version: DataTypes.DATE,
    upload_sync_versio: DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return mst_sync_dsp;
};