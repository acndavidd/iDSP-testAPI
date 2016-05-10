'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_account_receivable', {
      ar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      dsp_id: {
        type: Sequelize.STRING(20)
      },
      amount: {
        type: Sequelize.DECIMAL(10,2)
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
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_account_receivable');
  }
};