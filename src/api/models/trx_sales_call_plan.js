'use strict';
module.exports = function(sequelize, DataTypes) {
  var trx_sales_call_plan = sequelize.define('trx_sales_call_plan', {
    call_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    route_id: : {
      type: DataTypes.INTEGER,
      references: "mst_route",
      referencesKey: "mst_route"
    },
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