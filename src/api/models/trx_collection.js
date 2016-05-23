'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_collection = sequelize.define('trx_collection', {
    coll_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    dsp_id: {
      type: DataTypes.STRING(20)
    },
    retailer_id: {
      type: DataTypes.STRING(20)
    },
    trans_date: DataTypes.DATE,
    amount: DataTypes.DECIMAL(10,2),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_collection.belongsTo(models.mst_dsp,{as: 'Dsp', foreignKey : 'dsp_id'});
        trx_collection.belongsTo(models.mst_retailer,{as: 'Retailer', foreignKey : 'retailer_id'});
        trx_collection.hasMany(models.trx_collection_det,{as: 'CollectionDetail', foreignKey : 'coll_id'});
      },
      getAssociatedModels : function(){
        return ['mst_dsp','mst_retailer','trx_collection_det'];
        //return '';
      }
    }
  });
  return trx_collection;
};