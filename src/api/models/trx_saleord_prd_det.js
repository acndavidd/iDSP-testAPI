'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_prd_det = sequelize.define('trx_saleord_prd_det', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    product_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_saleord_prd_det;
};