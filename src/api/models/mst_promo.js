'use strict';
module.exports = function(sequelize, DataTypes) {
  var mst_promo = sequelize.define('mst_promo', {
    promo_id: {
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    product_id: DataTypes.STRING(20),
    promo_code: DataTypes.STRING(20),
    promo_name: DataTypes.STRING(50),
    promo_description: DataTypes.STRING(2500),
    target_outlet: DataTypes.STRING(20),
    promo_type: DataTypes.STRING(20),
    promo_value: DataTypes.DECIMAL(10,2),     
    promo_pict: DataTypes.STRING(50),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    sync_status:DataTypes.STRING(1),
    sync_version:DataTypes.DATE
  }, {
    timestamps : false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mst_promo;
};