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
        // associations can be defined here
      }
    }
  });
  return mst_target;
};