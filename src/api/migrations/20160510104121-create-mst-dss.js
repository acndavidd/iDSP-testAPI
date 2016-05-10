'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_dss', {
      dss_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      dist_id: {
        type: Sequelize.STRING(20)
      },
      first_name: {
        type: Sequelize.STRING(50)
      },
      last_name: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_dsses');
  }
};