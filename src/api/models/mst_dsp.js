'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_dsp = sequelize.define('mst_dsp', {
    dsp_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    dss_id: DataTypes.STRING(20),
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    dealer_min_smart: DataTypes.STRING(20),
    dealer_min_sun: DataTypes.STRING(20)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_dsp;
};