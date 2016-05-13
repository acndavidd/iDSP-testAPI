'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_percent_share = sequelize.define('mst_prod_percent_share', {
    prod_percent_share_id: DataTypes.STRING(20),
    product_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    percent_share: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_prod_percent_share;
};