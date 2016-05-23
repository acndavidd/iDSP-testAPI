'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_route = sequelize.define('mst_route', {
    route_id: {
      type : DataTypes.INTEGER,
      primaryKey : true,
      allowNull: false,
      autoIncrement: true
    },
    dsp_id : DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    freq_map_id: DataTypes.INTEGER,
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(20),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(20),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_route.belongsTo(models.mst_retailer,{as: 'Retailer', foreignKey : 'retailer_id'});
        mst_route.belongsTo(models.mst_freq_mapping,{as: 'FreqMapping', foreignKey : 'freq_map_id'});
        mst_route.hasMany(models.mst_route_day,{as: 'RouteDay', foreignKey : 'route_id'});
      },
      getAssociatedModels : function(){
        return ['mst_retailer','mst_freq_mapping','mst_route_day'];
      }
    }
  });
  return mst_route;
};