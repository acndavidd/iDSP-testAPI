'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mst_promo', {
      promo_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.STRING(20)
      },
      promo_name: {
        type: Sequelize.STRING(50)
      },
      promo_description: {
        type: Sequelize.STRING(2500)
      },
      promo_pict: {
        type: Sequelize.STRING(50)
      },
      promo_type: {
        type: Sequelize.STRING(20)
      },
      promo_value: {
        type: Sequelize.DECIMAL(10,2)
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mst_promo');
  }
};