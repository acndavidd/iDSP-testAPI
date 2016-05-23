'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_sales_order = sequelize.define('trx_sales_order', {
    order_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    dsp_id: {
      type: DataTypes.STRING(20)
    },
    retailer_id: {
      type: DataTypes.STRING(20)
    },
    order_date: DataTypes.DATE,
    remarks: DataTypes.STRING(100),
    total_amount: DataTypes.DECIMAL(10,2),
    promo_amount: DataTypes.DECIMAL(10,2),
    net_amount: DataTypes.DECIMAL(10,2),
    payment_amount: DataTypes.DECIMAL(10,2),
    balance: DataTypes.DECIMAL(10,2),
    payment_status: DataTypes.STRING(20),
    order_status: DataTypes.STRING(1),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_sales_order.belongsTo(models.mst_dsp,{as: 'Dsp', foreignKey : 'dsp_id'});
        trx_sales_order.belongsTo(models.mst_retailer,{as: 'Retailer', foreignKey : 'retailer_id'});
        trx_sales_order.hasMany(models.trx_saleord_load_det,{as: 'SalesOrderLoadDet', foreignKey : 'order_id'});
        trx_sales_order.hasMany(models.trx_saleord_prd_det,{as: 'SalesOrderPrdDet', foreignKey : 'order_id'});
        trx_sales_order.hasMany(models.trx_unserved_order,{as: 'SalesOrderUnserved', foreignKey : 'order_id'});
        trx_sales_order.hasMany(models.trx_account_receivable,{as: 'AccountReceivable', foreignKey : 'order_id'});
      },
      getAssociatedModels : function(){
        return ['mst_dsp' , 'mst_retailer' , 'trx_saleord_load_det' , 'trx_saleord_prd_det' , 'trx_unserved_order' , 'trx_account_receivable'];
        //return '';
      }
    }
  });
  return trx_sales_order;
};