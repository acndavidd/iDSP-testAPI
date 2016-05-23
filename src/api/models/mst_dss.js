'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_dss = sequelize.define('mst_dss', {
    dss_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    dist_id: DataTypes.STRING(20),
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  },{
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_dss.belongsTo(models.mst_dist, {as : 'Distributor' , foreignKey : 'dist_id'});
        mst_dss.hasMany(models.mst_dsp, {as : 'DSP' , foreignKey : 'dsp_id'});
      },
      getAssociatedModels : function(){
        return ['mst_dist' , 'mst_dsp'];
      }
    }
  });
  return mst_dss;
};