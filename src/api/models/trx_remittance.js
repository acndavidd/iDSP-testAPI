'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_remittance = sequelize.define('trx_remittance', {
    remit_id: DataTypes.INTEGER,
    dsp_id: DataTypes.STRING(20),
    trans_date: DataTypes.DATE,
    remit_amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_remittance;
};