'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_sales_call_plan = sequelize.define('trx_sales_call_plan', {
    call_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    route_id: {
      type: DataTypes.INTEGER
    },
    route_day: DataTypes.INTEGER,
    call_sequence: DataTypes.INTEGER,
    call_date: DataTypes.DATE,
    call_status: DataTypes.STRING(30),
    start_call_prep_date: DataTypes.DATE,
    end_call_prep_date: DataTypes.DATE,
    start_coll_date: DataTypes.DATE,
    end_coll_date: DataTypes.DATE,
    start_offer_date: DataTypes.DATE,
    end_offer_date: DataTypes.DATE,
    start_sales_date: DataTypes.DATE,
    end_sales_date: DataTypes.DATE,
    start_unserved_date: DataTypes.DATE,
    end_undserved_date: DataTypes.DATE,
    sales_remarks: DataTypes.STRING(30),
    sync_status: DataTypes.STRING(1),
    sync_version: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        trx_sales_call_plan.belongsTo(models.mst_route,{as: 'Route', foreignKey : 'route_id'});
      },
      getAssociatedModels : function(){
        return ['mst_route'];
        //return '';
      }
    }
  });
  return trx_sales_call_plan;
};