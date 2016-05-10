'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_unserved_order = sequelize.define('trx_unserved_order', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.STRING(20),
    quantity: DataTypes.INTEGER,
    remarks: DataTypes.STRING(50)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_unserved_order;
};