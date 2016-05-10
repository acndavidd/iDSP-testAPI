'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_dss = sequelize.define('mst_dss', {
    dss_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    dist_id: DataTypes.STRING(20),
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50)
  },{
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_dss;
};