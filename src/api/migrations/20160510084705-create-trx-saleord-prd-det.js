'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_saleord_prd_det', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_saleord_prd_det');
  }
};