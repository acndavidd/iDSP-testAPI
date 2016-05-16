'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_prod_sub_cat = sequelize.define('mst_prod_sub_cat', {
    sub_category_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    sub_category_name: DataTypes.STRING(50),
    category_id: DataTypes.STRING(20)
  }, {
    underscored : true,
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_prod_sub_cat.hasMany(models.mst_product, {as : 'Product' , foreignKey : 'sub_category_id'});
        mst_prod_sub_cat.belongsTo(models.mst_prod_cat, {as : 'ProductCategory' , foreignKey : 'category_id'});
        mst_prod_sub_cat.belongsToMany(models.mst_target, {as : 'Target', foreignKey:'target_id',through: models.mst_target});
      },
      getAssociatedModels : function(){
        return ['mst_product' , 'mst_prod_cat','mst_target'];
      }
    }
  });
  return mst_prod_sub_cat;
};