'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_prd_det = sequelize.define('trx_saleord_prd_det', {
    order_det_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_saleord_prd_det.belongsTo(models.trx_sales_order,{as: 'SalesOrder', foreignKey : 'order_id'});
        trx_saleord_prd_det.belongsTo(models.mst_product,{as: 'Product', foreignKey : 'product_id'});
        trx_saleord_prd_det.hasMany(models.trx_saleord_prd_sub_det,{as: 'SalesOrderPrdSubDet', foreignKey : 'order_det_id'});
      },
      getAssociatedModels : function(){
        return ['trx_sales_order','mst_product','trx_saleord_prd_sub_det'];
        //return '';
      }
    }
  });
  return trx_saleord_prd_det;
};