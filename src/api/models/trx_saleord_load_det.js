'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_load_det = sequelize.define('trx_saleord_load_det', {
    order_id: DataTypes.INTEGER,
    load_id: DataTypes.STRING(20),
    quantity: DataTypes.INTEGER,
    rrn: DataTypes.STRING(50),
    status: DataTypes.STRING(1)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_saleord_load_det;
};