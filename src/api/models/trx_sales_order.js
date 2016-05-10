'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_sales_order = sequelize.define('trx_sales_order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    dsp_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    order_date: DataTypes.DATE,
    remarks: DataTypes.STRING(100),
    total_amount: DataTypes.INTEGER,
    payment_amount: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    payment_status: DataTypes.STRING(20),
    order_status: DataTypes.STRING(1)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_sales_order;
};