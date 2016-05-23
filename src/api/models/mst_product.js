'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_product = sequelize.define('mst_product', {
    product_id: {
        type : DataTypes.STRING(20),
        primaryKey : true
    }, 
    product_name: DataTypes.STRING(50),
    sub_category_id: DataTypes.STRING(50),
    price: DataTypes.DECIMAL(10,2),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_product.belongsTo(models.mst_prod_sub_cat, {as : 'SubCategory' , foreignKey : 'sub_category_id'});
        mst_product.hasMany(models.mst_target , {as : 'Target' , foreignKey : 'product_id'});
        mst_product.hasMany(models.trx_collection, { as : 'Collection' , foreignKey : 'product_id'});
        mst_product.hasMany(models.trx_saleord_prd_det, { as : 'SalesOrder' , foreignKey : 'product_id'});
        mst_product.hasMany(models.trx_saleord_load_det, { as : 'SalesOrderLoad' , foreignKey : 'product_id'});
        mst_product.hasMany(models.trx_unserved_order, {as : 'UnservedOrder', foreignKey : 'product_id'});
      },
      getAssociatedModels : function(){
        return ['mst_prod_sub_cat', 'mst_target' , 'trx_collection' , 'trx_saleord_prd_det' , 'trx_unserved_order'];
      }
    }
  });
  return mst_product;
};