'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_route_day = sequelize.define('mst_route_day', {
    route_id: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    route_day: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    sequence: DataTypes.INTEGER
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        mst_route_day.belongsTo(models.mst_dsp,{as: 'Dsp', foreignKey : 'dsp_id'});
        mst_route_day.belongsTo(models.mst_retailer,{as: 'Retailer', foreignKey : 'retailer_id'});
        mst_route_day.belongsTo(models.mst_freq_mapping,{as: 'FreqMapping', foreignKey : 'freq_map_id'});
        mst_route_day.hasMany(models.trx_collection_det,{as: 'CollectionDetail', foreignKey : 'coll_id'});
      }
      getAssociatedModels : function(){
        return ['mst_dsp','mst_retailer','mst_freq_mapping','trx_collection_det'];
      }
    }
  });
  return mst_route_day;
};