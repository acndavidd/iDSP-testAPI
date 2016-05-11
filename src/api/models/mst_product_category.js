'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_product_category = sequelize.define('mst_product_category', {
    category_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    category_name: DataTypes.STRING(50),
    brand: DataTypes.STRING(20)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_product_category.hasMany(models.mst_prod_sub_category , {as : 'ProductSubCategory', foreignKey : 'category_id'});
      },
      getAssociatedModels : function(){
        return ['mst_prod_sub_category'];
      }
    }
  });
  return mst_product_category;
};