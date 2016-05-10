'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_retailer_dsp_alert', {
      retailer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      retailer_name: {
        type: Sequelize.STRING(50)
      },
      retailer_min: {
        type: Sequelize.STRING(20)
      },
      date: {
        type: Sequelize.DATE
      },
      value_segment: {
        type: Sequelize.STRING(10)
      },
      threshold_hit: {
        type: Sequelize.DECIMAL(10)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_retailer_dsp_alert');
  }
};