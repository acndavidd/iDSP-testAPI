'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_sales_order = sequelize.define('trx_sales_order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    dsp_id: {
      type: DataTypes.STRING(20),
      references: "mst_dsp",
      referencesKey: "dsp_id"
    },
    retailer_id: {
      type: DataTypes.STRING(20),
      references: "mst_retailer",
      referencesKey: "retailer_id"
    },
    order_date: DataTypes.DATE,
    remarks: DataTypes.STRING(100),
    total_amount: DataTypes.DECIMAL(10,2),
    payment_amount: DataTypes.DECIMAL(10,2),
    balance: DataTypes.DECIMAL(10,2),
    payment_status: DataTypes.STRING(20),
    order_status: DataTypes.STRING(1)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_sales_order.belongsTo(models.mst_dsp);
        trx_sales_order.belongsTo(models.mst_retailer);
        trx_sales_order.hasMany(models.trx_saleord_load_det);
        trx_sales_order.hasMany(models.trx_saleord_prd_det);
        trx_sales_order.hasMany(models.trx_unserved_order);
        trx_sales_order.hasMany(models.trx_account_receivable);
      }
    }
  });
  return trx_sales_order;
};