'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_retailer = sequelize.define('mst_retailer', {
    retailer_id: {
      type : DataTypes.STRING(20),
      primaryKey : true
    },
    retailer_name: DataTypes.STRING(50),
    retailer_min: DataTypes.STRING(20),
    owner_first_name: DataTypes.STRING(20),
    owned_middle_name: DataTypes.STRING(20),
    owned_last_name: DataTypes.STRING(20),
    retailer_address: DataTypes.STRING(100),
    civil_status: DataTypes.STRING(20),
    email: DataTypes.STRING(100),
    gender: DataTypes.STRING(10),
    birthday: DataTypes.DATE,
    percent_share: DataTypes.INTEGER,
    dsp_id: DataTypes.STRING(20),
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
  return mst_retailer;
};