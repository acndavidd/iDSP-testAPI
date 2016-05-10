'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_route_day = sequelize.define('mst_route_day', {
    route_id: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    route_day: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    sequence: DataTypes.INTEGER
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_route_day;
};