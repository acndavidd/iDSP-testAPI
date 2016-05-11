'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_prd_sub_det = sequelize.define('trx_saleord_prd_sub_det', {
    serial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: "trx_saleord_prd_det",
      referencesKey: "order_id"
    },
    product_id: {
      type: DataTypes.STRING(20),
      references: "trx_saleord_prd_det",
      referencesKey: "product_id"
    },
    serial_number_start: DataTypes.STRING(30),
    serial_number_end: DataTypes.STRING(30),
    qty: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_saleord_prd_sub_det.belongsTo(models.trx_saleord_prd_det);
      }
    }
  });
  return trx_saleord_prd_sub_det;
};