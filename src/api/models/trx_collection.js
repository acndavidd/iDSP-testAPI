'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection = sequelize.define('trx_collection', {
    coll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    dsp_id: {
      type: DataTypes.STRING(20),
      references: "mst_dsp",
      referencesKey: "dsp_id"
    },
    retailer_id: {
      type: DataTypes.STRING(20),
      references: "mst_retailer",
      referencesKey: "retailer_id"
    },
    trans_date: DataTypes.DATE,
    amount: DataTypes.DECIMAL(10,2)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_collection.belongsTo(models.mst_dsp);
        trx_collection.belongsTo(models.mst_retailer);
        trx_collection.hasMany(models.trx_collection_det);
      }
    }
  });
  return trx_collection;
};