'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_dsp = sequelize.define('mst_dsp', {
    dsp_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    dss_id: DataTypes.STRING(20),
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    dealer_min_smart: DataTypes.STRING(20),
    dealer_min_sun: DataTypes.STRING(20),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_dsp.belongsTo(models.mst_dss , {as : 'DSS', foreignKey : 'dsp_id'});
        mst_dsp.hasMany(models.mst_retailer , {as : 'Retailer' , foreignKey : 'dsp_id'});
        mst_dsp.hasMany(models.mst_target , {as : 'Target' , foreignKey : 'dsp_id'});
        mst_dsp.hasMany(models.trx_remittance, {as : 'Remittance', foreignKey : 'dsp_id'});
        mst_dsp.hasMany(models.trx_sales_order , {as : 'SalesOrder' , foreignKey : 'dsp_id'});
        mst_dsp.hasMany(models.trx_collection, {as : 'Collection', foreignKey : 'dsp_id'});
        mst_dsp.hasMany(models.trx_account_receivable, {as : 'AccountReceivable' , foreignKey : 'dsp_id'});
      },
      getAssociatedModels : function(){
        return [
        'mst_dss',
        'mst_retailer' , 
        'mst_target',
        'trx_remittance' , 
        'trx_sales_order' , 
        'trx_collection' , 
        'trx_account_receivable'];
      }
    }
  });
  return mst_dsp;
};