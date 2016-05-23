'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_sub_cat = sequelize.define('mst_prod_sub_cat', {
    sub_category_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    sub_category_name: DataTypes.STRING(20),
    category_id: DataTypes.STRING(20),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    underscored : true,
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_prod_sub_cat.hasMany(models.mst_product, {as : 'Product' , foreignKey : 'sub_category_id'});
        mst_prod_sub_cat.belongsTo(models.mst_prod_cat, {as : 'ProductCategory' , foreignKey : 'category_id'});
        //mst_prod_sub_cat.hasMany(models.mst_target, {as : 'Target', foreignKey:'sub_category_id'});
      },
      getAssociatedModels : function(){
        return ['mst_product' , 'mst_prod_cat','mst_target','trx_saleord_load_det'];
      }
    }
  });
  return mst_prod_sub_cat;
};