'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_product', {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      product_name: {
        type: Sequelize.STRING(50)
      },
      price: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_product');
  }
};