'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_freq_mapping = sequelize.define('mst_freq_mapping', {
    freq_map_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    frequency: DataTypes.STRING(3),
    schedule_value: DataTypes.STRING(50),
    schedule_name: DataTypes.STRING(100),
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        mst_freq_mapping.belongsTo(models.mst_route, {as : 'Route' , foreignKey : 'freq_map_id'});
      },
      getAssociatedModels : function(){
        return ['mst_route'];
      }
    }
  });
  return mst_freq_mapping;
};