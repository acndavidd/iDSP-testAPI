'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_account_receivable = sequelize.define('trx_account_receivable', {
    ar_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    order_id: {
      type: DataTypes.STRING(50)
    },
    dsp_id: {
      type: DataTypes.STRING(20)
    },
    retailer_id: {
      type: DataTypes.STRING(20)
    },
    amount: DataTypes.DECIMAL(10,2),
    trans_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: DataTypes.STRING(10),
    aging: DataTypes.STRING(10),
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(30),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(30),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_account_receivable.belongsTo(models.trx_sales_order,{as: 'SalesOrder', foreignKey : 'order_id'});
        trx_account_receivable.belongsTo(models.mst_dsp,{as: 'Dsp', foreignKey : 'dsp_id'});
        trx_account_receivable.belongsTo(models.mst_retailer,{as: 'Retailer', foreignKey : 'retailer_id'});
        trx_account_receivable.hasMany(models.trx_collection_det,{as: 'CollectionDet', foreignKey : 'ar_id'});
      },
      getAssociatedModels : function(){
        return ['trx_sales_order','mst_dsp','mst_retailer','trx_collection_det'];
        //return '';
      }
    }
  });
  return trx_account_receivable;
};