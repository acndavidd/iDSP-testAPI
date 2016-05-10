'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_remittance_det = sequelize.define('trx_remittance_det', {
    remit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    remit_det_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    remit_type: DataTypes.INTEGER,
    bank_name: DataTypes.STRING(30),
    branch_name: DataTypes.STRING(50),
    transfer_date: DataTypes.DATE,
    account_no: DataTypes.STRING(20),
    rrn: DataTypes.STRING(20),
    remit_amount: DataTypes.DECIMAL(10,2)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_remittance_det;
};