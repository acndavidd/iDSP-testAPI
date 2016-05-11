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
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_prod_sub_category.belongsToMany(models.mst_product, {as : 'Products' , foreignKey : 'product_id'});
        //mst_prod_sub_category.belongsTo(models.mst_product_category);
      },
      getAssociatedModels : function(){
        return ['mst_product' , 'mst_product_category'];
      }
    }
  });
  return mst_prod_sub_category;
};