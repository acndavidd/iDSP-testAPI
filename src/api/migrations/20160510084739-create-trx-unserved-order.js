'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_unserved_order', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      product_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      remarks: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_unserved_order');
  }
};