'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_sales_call_plan = sequelize.define('trx_sales_call_plan', {
    call_id: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER,
    route_day: DataTypes.INTEGER,
    call_sequence: DataTypes.INTEGER,
    call_date: DataTypes.DATE,
    call_status: DataTypes.STRING(30),
    start_coll_date: DataTypes.DATE,
    end_coll_date: DataTypes.DATE,
    start_offer_date: DataTypes.DATE,
    end_offer_date: DataTypes.DATE,
    start_sales_date: DataTypes.DATE,
    end_sales_date: DataTypes.DATE,
    sales_remarks: DataTypes.STRING(30)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return trx_sales_call_plan;
};