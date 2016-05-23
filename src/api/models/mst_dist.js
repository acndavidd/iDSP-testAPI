'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_dist = sequelize.define('mst_dist', {
    dist_id: {
      type : DataTypes.STRING(20),
      primaryKey  : true
    }, 
    dist_name: DataTypes.STRING(50),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_dist.hasMany(models.mst_dss, {as : 'DSS' , foreignKey : 'dist_id'});
      },
      getAssociatedModels : function(){
        return ['mst_dss'];
      }
    }
  });
  return mst_dist;
};