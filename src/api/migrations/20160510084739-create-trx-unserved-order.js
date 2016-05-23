'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_unserved_order', {
      order_det_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      product_id: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      remarks: {
        type: Sequelize.STRING(50)
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
    return queryInterface.dropTable('trx_unserved_order');
  }
};