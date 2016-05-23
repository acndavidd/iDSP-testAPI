'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_dsp', {
      dsp_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      dss_id: {
        type: Sequelize.STRING(20)
      },
      first_name: {
        type: Sequelize.STRING(50)
      },
      last_name: {
        type: Sequelize.STRING(50)
      },
      dealer_min_smart: {
        type: Sequelize.STRING(20)
      },
      dealer_min_sun: {
        type: Sequelize.STRING(20)
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
    return queryInterface.dropTable('mst_dsp');
  }
};