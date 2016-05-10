'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_account_receivable = sequelize.define('trx_account_receivable', {
    ar_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    order_id: DataTypes.INTEGER,
    dsp_id: DataTypes.STRING(20),
    amount: DataTypes.DECIMAL(10,2),
    trans_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: DataTypes.STRING(10),
    aging: DataTypes.STRING(10),
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(30),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(30)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },

  });
  return trx_account_receivable;
};