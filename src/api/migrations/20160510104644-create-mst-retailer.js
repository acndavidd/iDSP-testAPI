'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_retailer', {
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
      owner_first_name: {
        type: Sequelize.STRING(20)
      },
      owner_middle_name: {
        type: Sequelize.STRING(20)
      },
      owner_last_name: {
        type: Sequelize.STRING(20)
      },
      retailer_type: {
        type: Sequelize.STRING(20)
      },
      retailer_address: {
        type: Sequelize.STRING(100)
      },
      civil_status: {
        type: Sequelize.STRING(20)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      birthday: {
        type: Sequelize.DATE
      },
      percent_share: {
        type: Sequelize.INTEGER
      },
      dsp_id: {
        type: Sequelize.STRING(20)
      },
      created_date: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.STRING(20)
      },
      updated_date: {
        type: Sequelize.DATE
      },
      updated_by: {
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
    return queryInterface.dropTable('mst_retailer');
  }
};