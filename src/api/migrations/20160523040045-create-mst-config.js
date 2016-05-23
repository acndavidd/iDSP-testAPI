'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_config', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.STRING(200)
      },
      value: {
        type: Sequelize.STRING(200)
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
    return queryInterface.dropTable('mst_config');
  }
};