'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_cat = sequelize.define('mst_prod_cat', {
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
        mst_product_cat.hasMany(models.mst_prod_sub_cat , {as : 'ProductSubCategory', foreignKey : 'category_id'});
      },
      getAssociatedModels : function(){
        return ['mst_prod_sub_cat'];
      }
    }
  });
  return mst_prod_cat;
};