'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_sub_category = sequelize.define('mst_prod_sub_category', {
    sub_category_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    sub_category_name: DataTypes.STRING(50),
    category_id: DataTypes.STRING(20),
    brand: DataTypes.STRING(20)
  }, {
    underscored : true,
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_prod_sub_category.hasMany(models.mst_product, {as : 'Product' , foreignKey : 'sub_category_id'});
        mst_prod_sub_category.belongsTo(models.mst_product_category, {as : 'ProductCategory' , foreignKey : 'category_id'});
      },
      getAssociatedModels : function(){
        return ['mst_product' , 'mst_product_category'];
      }
    }
  });
  return mst_prod_sub_category;
};