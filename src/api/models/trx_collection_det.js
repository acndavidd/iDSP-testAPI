'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection_det = sequelize.define('trx_collection_det', {
    coll_det_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    coll_id: {
      type: DataTypes.STRING(50)
    },
    ar_id: {
      type: DataTypes.STRING(50)
    },
    ar_type: DataTypes.STRING(20),
    amount: DataTypes.DECIMAL(10,2),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_collection_det.belongsTo(models.trx_account_receivable,{as: 'AccountReceivable', foreignKey : 'ar_id'});
        trx_collection_det.belongsTo(models.trx_collection,{as: 'Collection', foreignKey : 'coll_id'});
      },
      getAssociatedModels : function(){
        return ['trx_account_receivable','trx_collection'];
        //return '';
      }
    }
  });
  return trx_collection_det;
};