'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_account_receivable = sequelize.define('trx_account_receivable', {
    ar_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    order_id: : {
      type: DataTypes.INTEGER,
      references: "trx_sales_order",
      referencesKey: "order_id"
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
    amount: DataTypes.DECIMAL(10,2),
    trans_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: DataTypes.STRING(10),
    aging: DataTypes.STRING(10),
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(30),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(30)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_account_receivable.belongsTo(models.trx_sales_order);
        trx_account_receivable.belongsTo(models.mst_dsp);
        trx_account_receivable.belongsTo(models.mst_retailer);
        trx_account.receivable.hasMany(models.trx_collection_det);
      }
    },

  });
  return trx_account_receivable;
};