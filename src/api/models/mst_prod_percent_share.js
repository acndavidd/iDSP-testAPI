'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_percent_share = sequelize.define('mst_prod_percent_share', {
    prod_percent_share_id: DataTypes.STRING(20),
    product_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    percent_share: DataTypes.INTEGER,
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        mst_prod_percent_share.belongsTo(models.mst_product , {as : 'Product', foreignKey : 'product_id'});
        mst_prod_percent_share.belongsTo(models.mst_retailer , {as : 'Retailer', foreignKey : 'reatiler_id'});
      },
      getAssociatedModels : function(){
        return ['mst_product','mst_retailer'];
      }
    }
  });
  return mst_prod_percent_share;
};