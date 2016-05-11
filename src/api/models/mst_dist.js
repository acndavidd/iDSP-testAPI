'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_dist = sequelize.define('mst_dist', {
    dist_id: {
      type : DataTypes.STRING(20),
      primaryKey  : true
    }, 
    dist_name: DataTypes.STRING(50)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return mst_dist;
};