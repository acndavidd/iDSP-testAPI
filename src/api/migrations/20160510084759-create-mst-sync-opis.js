'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_sync_opis', {
      table_name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
      },
      table_description: {
        type: Sequelize.STRING(200)
      },
      download_sync_version: {
        type: Sequelize.DATE
      },
      upload_sync_version: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_sync_opis');
  }
};