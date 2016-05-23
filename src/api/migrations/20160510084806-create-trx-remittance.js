'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_remittance', {
      remit_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      dsp_id: {
        type: Sequelize.STRING(20)
      },
      trans_date: {
        type: Sequelize.DATE
      },
      remit_amount: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('trx_remittance');
  }
};