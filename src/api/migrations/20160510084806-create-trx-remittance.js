'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_remittance', {
      remit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_remittance');
  }
};