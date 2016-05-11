'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection_det = sequelize.define('trx_collection_det', {
    coll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      references: "trx_collection",
      referencesKey: "coll_id"
    },
    ar_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    ar_type: DataTypes.STRING(20),
    amount: DataTypes.DECIMAL(10,2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_collection_det.belongsTo(models.trx_account_receivable);
      }
    }
  });
  return trx_collection_det;
};