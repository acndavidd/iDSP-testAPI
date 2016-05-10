'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection = sequelize.define('trx_collection', {
    coll_id: DataTypes.INTEGER,
    dsp_id: DataTypes.STRING(20),
    retailer_id: DataTypes.STRING(20),
    trans_date: DataTypes.DATE,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_collection;
};