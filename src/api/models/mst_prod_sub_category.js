'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_sub_category = sequelize.define('mst_prod_sub_category', {
    sub_category_id: {
      type        :DataTypes.STRING(20),
      primaryKey  : true 
    },
    sub_category_name: DataTypes.STRING(50),
    category_id: DataTypes.STRING(20),
    brand: DataTypes.STRING(20)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_prod_sub_category;
};