'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_product_category = sequelize.define('mst_product_category', {
    category_id: {
      type       : DataTypes.STRING(20),
      primaryKey : true
    },
    category_name: {
      type       : DataTypes.STRING(50),
    },
    brand: DataTypes.VARCHAR(20)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_product_category;
};