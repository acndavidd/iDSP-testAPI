'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection_det = sequelize.define('trx_collection_det', {
    coll_id: DataTypes.INTEGER,
    ar_id: DataTypes.INTEGER,
    ar_type: DataTypes.STRING(20),
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_collection_det;
};