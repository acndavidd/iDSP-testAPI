'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_retailer_dsp_alert = sequelize.define('mst_retailer_dsp_alert', {
    retailer_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    retailer_name: DataTypes.STRING(50),
    retailer_min: DataTypes.STRING(20),
    date: DataTypes.DATE,
    value_segment: DataTypes.STRING(10),
    threshold_hit: DataTypes.DECIMAL(10)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_retailer_dsp_alert.belongsTo(models.mst_retailer, {as : 'Retailer' , foreignKey : 'retailer_id'});
      },
      getAssociatedModels : function(){
        return ['mst_retailer'];
      }
    }
  });
  return mst_retailer_dsp_alert;
};