'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_prd_det = sequelize.define('trx_saleord_prd_det', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      references: "trx_sales_order",
      referencesKey: "order_id"
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
    price: DataTypes.DECIMAL(10,2)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_saleord_prd_det.belongsTo(models.trx_sales_order);
        trx_saleord_prd_det.belongsTo(models.mst_product);
        trx_saleord_prd_det.hasMany(models.trx_saleord_prd_sub_det);
      }
    }
  });
  return trx_saleord_prd_det;
};