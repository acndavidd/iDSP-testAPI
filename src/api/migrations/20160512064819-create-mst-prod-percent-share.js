'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_prod_percent_share', {
      prod_percent_share_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      product_id: {
        type: Sequelize.STRING(20)
      },
      retailer_id: {
        type: Sequelize.STRING(20)
      },
      percent_share: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('mst_prod_percent_share');
  }
};