'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_remittance = sequelize.define('trx_remittance', {
    remit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    dsp_id: DataTypes.STRING(20),
    trans_date: DataTypes.DATE,
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
  return trx_remittance;
};