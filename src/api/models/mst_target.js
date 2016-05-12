'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_target = sequelize.define('mst_target', {
    target_id: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    dsp_id: DataTypes.STRING(20),
    product_id: DataTypes.STRING(20),
    target_month: DataTypes.INTEGER,
    target_year: DataTypes.INTEGER,
    target_qty: DataTypes.INTEGER
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_target.belongsTo(models.mst_dsp, {as : 'DSP' , foreignKey : 'dsp_id'});
        mst_target.belongsTo(models.mst_product, {as : 'Product' , foreignKey : 'product_id'});
      },
      getAssociatedModels : function(){
        return ['mst_dss' , 'mst_product'];
      }
    }
  });
  return mst_target;
};