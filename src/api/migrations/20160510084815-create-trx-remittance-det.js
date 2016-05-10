'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_remittance_dets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      remit_id: {
        type: Sequelize.INTEGER
      },
      remit_det_id: {
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('trx_remittance_dets');
  }
};