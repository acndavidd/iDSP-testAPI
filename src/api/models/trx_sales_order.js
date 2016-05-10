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
    dsp_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
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
      }
    }
  });
  return trx_sales_order;
};