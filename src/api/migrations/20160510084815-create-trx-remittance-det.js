'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_remittance_det', {
      remit_det_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
      },
      remit_id: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      remit_type: {
        type: Sequelize.INTEGER
      },
      bank_name: {
        type: Sequelize.STRING(30)
      },
      branch_name: {
        type: Sequelize.STRING(50)
      },
      transfer_date: {
        type: Sequelize.DATE
      },
      account_no: {
        type: Sequelize.STRING(20)
      },
      rrn: {
        type: Sequelize.STRING(20)
      },
      remit_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      sync_status: {
        type: Sequelize.STRING(1)
      },
      sync_version: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_remittance_det');
  }
};