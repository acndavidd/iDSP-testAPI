'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_sales_call_plan', {
      call_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      route_id: {
        type: Sequelize.INTEGER
      },
      route_day: {
        type: Sequelize.INTEGER
      },
      call_sequence: {
        type: Sequelize.INTEGER
      },
      call_date: {
        type: Sequelize.DATE
      },
      call_status: {
        type: Sequelize.STRING(30)
      },
      start_coll_date: {
        type: Sequelize.DATE
      },
      end_coll_date: {
        type: Sequelize.DATE
      },
      start_offer_date: {
        type: Sequelize.DATE
      },
      end_offer_date: {
        type: Sequelize.DATE
      },
      start_sales_date: {
        type: Sequelize.DATE
      },
      end_sales_date: {
        type: Sequelize.DATE
      },
      sales_remarks: {
        type: Sequelize.STRING(30)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_sales_call_plan');
  }
};