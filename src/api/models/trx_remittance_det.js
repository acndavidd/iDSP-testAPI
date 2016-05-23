'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_remittance_det = sequelize.define('trx_remittance_det', {
    remit_det_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    remit_id: {
      type: DataTypes.STRING(50)
    },
    remit_type: DataTypes.INTEGER,
    bank_name: DataTypes.STRING(30),
    branch_name: DataTypes.STRING(50),
    transfer_date: DataTypes.DATE,
    account_no: DataTypes.STRING(20),
    rrn: DataTypes.STRING(20),
    remit_amount: DataTypes.DECIMAL(10,2),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_remittance_det.belongsTo(models.trx_remittance,{as: 'Remittance', foreignKey : 'remit_id'});
      },
      getAssociatedModels : function(){
        return ['trx_remittance'];
        //return '';
      }
    }
  });
  return trx_remittance_det;
};