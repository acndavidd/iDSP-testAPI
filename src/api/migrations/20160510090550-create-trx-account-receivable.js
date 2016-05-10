'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_account_receivables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ar_id: {
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      dsp_id: {
        type: Sequelize.STRING(20)
      },
      amount: {
        type: Sequelize.INTEGER
      },
      trans_date: {
        type: Sequelize.DATE
      },
      due_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING(10)
      },
      aging: {
        type: Sequelize.STRING(10)
      },
      created_date: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.STRING(30)
      },
      updated_date: {
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(30)
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
    return queryInterface.dropTable('trx_account_receivables');
  }
};