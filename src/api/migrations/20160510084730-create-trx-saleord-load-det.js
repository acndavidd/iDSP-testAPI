'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_saleord_load_det', {
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
      amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      promo_code: {
        type: Sequelize.STRING(20)
      },
      promo_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      rrn: {
        type: Sequelize.STRING(50)
      },
      status: {
        type: Sequelize.STRING(1)
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
    return queryInterface.dropTable('trx_saleord_load_det');
  }
};