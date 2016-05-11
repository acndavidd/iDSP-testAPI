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
      unique: true,
      references: "mst_product",
      referencesKey: "product_id"
    },
    quantity: DataTypes.INTEGER,
    remarks: DataTypes.STRING(50)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_unserved_order.belongsTo(models.trx_sales_order);
        trx_unserved_order.belongsTo(models.mst_product);
      }
    }
  });
  return trx_unserved_order;
};