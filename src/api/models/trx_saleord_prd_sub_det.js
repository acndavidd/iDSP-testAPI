'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_saleord_prd_sub_det = sequelize.define('trx_saleord_prd_sub_det', {
    serial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    order_det_id: {
      type: DataTypes.INTEGER
    },
    serial_number_start: DataTypes.STRING(30),
    serial_number_end: DataTypes.STRING(30),
    qty: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_saleord_prd_sub_det.belongsTo(models.trx_saleord_prd_det,{as: 'SalesOrderPrdDet', foreignKey : 'order_det_id'});
      },
      getAssociatedModels : function(){
        return ['trx_saleord_prd_det'];
        //return '';
      }
    }
  });
  return trx_saleord_prd_sub_det;
};