'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_remittance_det', {
      remit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      remit_det_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
        type: Sequelize.DECIMAL(10,2)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_remittance_det');
  }
};