'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_remittance = sequelize.define('trx_remittance', {
    remit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    dsp_id: {
      type: DataTypes.STRING(20)
    },
    trans_date: DataTypes.DATE,
    remit_amount: DataTypes.DECIMAL(10,2)
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_remittance.belongsTo(models.mst_dsp,{as: 'Dsp', foreignKey : 'dsp_id'});
        trx_remittance.hasMany(models.trx_remittance_det,{as: 'RemittanceDet', foreignKey : 'remit_id'});
      },
      getAssociatedModels : function(){
        return ['mst_dsp','trx_remittance_det'];
        //return '';
      }
    }
  });
  return trx_remittance;
};