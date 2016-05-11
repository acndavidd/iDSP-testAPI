'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_product = sequelize.define('mst_product', {
    product_id: {
        type : DataTypes.STRING(20),
        primaryKey : true
    }, 
    product_name: DataTypes.STRING(50),
    category_id: DataTypes.STRING(30),
    sub_category_id: DataTypes.STRING(50),
    brand: DataTypes.STRING(50),
    price: DataTypes.DECIMAL(10,2)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_product.belongsTo(models.mst_prod_sub_category);
      },
      getAssociatedModels : function(){
        return ['mst_prod_sub_category'];
      }
    }
  });
  return mst_product;
};