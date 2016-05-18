'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_saleord_prd_sub_det', {
      serial_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      order_det_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
      },
      serial_number_start: {
        type: Sequelize.STRING(30)
      },
      serial_number_end: {
        type: Sequelize.STRING(30)
      },
      qty: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_saleord_prd_sub_det');
  }
};