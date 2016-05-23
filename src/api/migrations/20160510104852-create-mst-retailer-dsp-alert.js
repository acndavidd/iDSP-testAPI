'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_retailer_dsp_alert', {
      alert_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement : true,
        type: Sequelize.INTEGER
      },
      retailer_id: {
        type: Sequelize.STRING(20)
      },
      retailer_name: {
        type: Sequelize.STRING(50)
      },
      date: {
        type: Sequelize.DATE
      },
      value_segment: {
        type: Sequelize.STRING(10)
      },
      threshold_hit: {
        type: Sequelize.DECIMAL(10)
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
    return queryInterface.dropTable('mst_retailer_dsp_alert');
  }
};