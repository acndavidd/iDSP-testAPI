'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_sales_orders', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dsp_id: {
        type: Sequelize.STRING(20)
      },
      retailer_id: {
        type: Sequelize.STRING(20)
      },
      order_date: {
        type: Sequelize.DATE
      },
      remarks: {
        type: Sequelize.STRING(100)
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      payment_amount: {
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.INTEGER
      },
      payment_status: {
        type: Sequelize.STRING(20)
      },
      order_status: {
        type: Sequelize.STRING(1)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_sales_orders');
  }
};