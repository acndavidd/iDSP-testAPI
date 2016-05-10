'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_unserved_order = sequelize.define('trx_unserved_order', {
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
    remarks: DataTypes.STRING(50)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_unserved_order;
};