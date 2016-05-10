'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_load_det = sequelize.define('trx_saleord_load_det', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    load_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    amount: DataTypes.DECIMAL(10,2),
    rrn: DataTypes.STRING(50),
    status: DataTypes.STRING(1)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_saleord_load_det;
};