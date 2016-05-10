'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_product = sequelize.define('mst_product', {
    product_id: {
        type        : DataTypes.STRING(20),
        primaryKey  : true
    }, 
    product_name: {
        type        : DataTypes.STRING(50)
    },
    category_id: {
        type        : DataTypes.STRING(30)
    },
    sub_category_id: {
        type        : DataTypes.STRING(50)
    },
    brand: {
        DataTypes.STRING(50)
    },
    price: {
      type          : DataTypes.DECIMAL(10,2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_product;
};