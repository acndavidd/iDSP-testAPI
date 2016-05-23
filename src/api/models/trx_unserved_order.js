'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_unserved_order = sequelize.define('trx_unserved_order', {
    order_det_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    order_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    product_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    remarks: DataTypes.STRING(50),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_unserved_order.belongsTo(models.trx_sales_order,{as: 'SalesOrder', foreignKey : 'order_id'});
        trx_unserved_order.belongsTo(models.mst_product,{as: 'Product',foreignKey : 'product_id'});
      },
      getAssociatedModels : function(){
        return ['trx_sales_order','mst_product'];
      }
    }
  });
  return trx_unserved_order;
};