'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_offer = sequelize.define('mst_offer', {
    offer_id: DataTypes.INTEGER,
    offer: DataTypes.STRING(20),
    offer_description: DataTypes.STRING(2500),
    offer_picture: DataTypes.STRING(200),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_offer;
};