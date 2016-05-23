'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_dist', {
      dist_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      dist_name: {
        type: Sequelize.STRING(50)
      },
      sync_status:{
        type : Sequelize.STRING(1)
      },
      sync_version:{
        type : Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_dist');
  }
};