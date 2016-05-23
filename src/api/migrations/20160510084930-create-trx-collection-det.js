'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_collection_det', {
      coll_det_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      coll_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ar_id: {
        type: Sequelize.STRING(50)
      },
      ar_type: {
        type: Sequelize.STRING(20)
      },
      amount: {
        type: Sequelize.DECIMAL(10,2)
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
    return queryInterface.dropTable('trx_collection_det');
  }
};