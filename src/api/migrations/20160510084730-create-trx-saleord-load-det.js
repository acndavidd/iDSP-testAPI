'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_saleord_load_dets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      load_id: {
        type: Sequelize.STRING(20)
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      rrn: {
        type: Sequelize.STRING(50)
      },
      status: {
        type: Sequelize.STRING(1)
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
    return queryInterface.dropTable('trx_saleord_load_dets');
  }
};