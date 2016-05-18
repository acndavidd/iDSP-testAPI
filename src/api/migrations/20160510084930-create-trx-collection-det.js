'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('trx_collection_det', {
      coll_det_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      coll_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ar_id: {
        type: Sequelize.INTEGER
      },
      ar_type: {
        type: Sequelize.STRING(20)
      },
      amount: {
        type: Sequelize.DECIMAL(10,2)
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('trx_collection_det');
  }
};