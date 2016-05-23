'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_sync_dsp', {
      dsp_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
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
    return queryInterface.dropTable('mst_sync_dsp');
  }
};