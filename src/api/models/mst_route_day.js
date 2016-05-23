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
    sequence: DataTypes.INTEGER,
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_route_day.belongsTo(models.mst_route,{as: 'Route', foreignKey : 'route_id'});
      },
      getAssociatedModels : function(){
        return ['mst_route'];
      }
    }
  });
  return mst_route_day;
};