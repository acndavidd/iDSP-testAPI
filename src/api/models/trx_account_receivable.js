'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_account_receivable = sequelize.define('trx_account_receivable', {
    ar_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    dsp_id: DataTypes.STRING(20),
    amount: DataTypes.INTEGER,
    trans_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: DataTypes.STRING(10),
    aging: DataTypes.STRING(10),
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(30),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(30)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_account_receivable;
};