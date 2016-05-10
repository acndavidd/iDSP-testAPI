'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_prd_det = sequelize.define('trx_saleord_prd_det', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.STRING(20),
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_saleord_prd_det;
};