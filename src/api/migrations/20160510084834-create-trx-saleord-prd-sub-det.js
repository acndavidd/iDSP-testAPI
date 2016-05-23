'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_saleord_prd_sub_det', {
      serial_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      order_det_id: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      serial_number_start: {
        type: Sequelize.STRING(30)
      },
      serial_number_end: {
        type: Sequelize.STRING(30)
      },
      quantity: {
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
    return queryInterface.dropTable('trx_saleord_prd_sub_det');
  }
};