'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection_det = sequelize.define('trx_collection_det', {
    coll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    ar_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    ar_type: DataTypes.STRING(20),
    amount: DataTypes.DECIMAL(10,2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_collection_det.belongsTo(models.trx_account_receivable,{as: 'AccountReceivable', foreignKey : 'ar_id'});
      },
      getAssociatedModels : function(){
        return ['trx_account_receivable'];
        //return '';
      }
    }
  });
  return trx_collection_det;
};