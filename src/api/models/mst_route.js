'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_route = sequelize.define('mst_route', {
    route_id: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    dsp_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    freq_map_id: DataTypes.INEGER,
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(20),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(20)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        mst_route.belongsTo(models.mst_dsp,{as: 'Dsp', foreignKey : 'dsp_id'});
        mst_route.belongsTo(models.mst_retailer,{as: 'Retailer', foreignKey : 'retailer_id'});
        mst_route.belongsTo(models.mst_freq_mapping,{as: 'FreqMapping', foreignKey : 'freq_map_id'});
        mst_route.hasMany(models.mst_route_day,{as: 'RouteDay', foreignKey : 'route_id'});
      }
      getAssociatedModels : function(){
        return ['mst_dsp','mst_retailer','mst_freq_mapping','mst_route_day'];
      }
    }
  });
  return mst_route;
};