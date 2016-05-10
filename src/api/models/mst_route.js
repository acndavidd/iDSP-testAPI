'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_route = sequelize.define('mst_route', {
    route_id: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    dsp_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    frequency: DataTypes.STRING(3),
    created_date: DataTypes.DATE,
    created_by: DataTypes.STRING(20),
    updated_date: DataTypes.DATE,
    updated_by: DataTypes.STRING(20)
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_route;
};