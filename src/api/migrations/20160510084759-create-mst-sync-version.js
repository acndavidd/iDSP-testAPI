'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_sync_version', {
      table_name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
      },
      table_description: {
        type: Sequelize.STRING(200)
      },
      lastSync: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_sync_versions');
  }
};