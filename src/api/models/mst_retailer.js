'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_retailer = sequelize.define('mst_retailer', {
    retailer_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    retailer_name: DataTypes.STRING(50),
    retailer_min: DataTypes.STRING(20),
    owner_first_name: DataTypes.STRING(20),
    owner_middle_name: DataTypes.STRING(20),
    owner_last_name: DataTypes.STRING(20),
    retailer_type: DataTypes.STRING(20),
    retailer_address: DataTypes.STRING(100),
    civil_status: DataTypes.STRING(20),
    email: DataTypes.STRING(100),
    gender: DataTypes.STRING(10),
    birthday: DataTypes.DATE,
    percent_share: DataTypes.INTEGER,
    dsp_id: DataTypes.STRING(20),
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(20),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(20),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(20)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: { 
      associate: function(models) {
        mst_retailer.hasMany(models.mst_retailer_dsp_alert, {as : 'RetailerDSPAlert' , foreignKey : 'retailer_id'});
        mst_retailer.hasMany(models.mst_route, {as : 'Route' , foreignKey : 'retailer_id'});
        mst_retailer.belongsTo(models.mst_dsp , {as : 'DSP' , foreignKey : 'dsp_id'});
        mst_retailer.hasMany(models.trx_account_receivable, {as : 'AccountReceivable' , foreignKey : 'retailer_id'});
      },
      getAssociatedModels : function(){
        return ['mst_retailer_dsp_alert' , 'mst_dsp', 'mst_route' , 'trx_account_receivable'];
      }
    }
  });
  return mst_retailer;
};