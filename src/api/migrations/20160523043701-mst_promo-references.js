'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_promo',
        'product_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'mst_product',
              key: 'product_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_promo DROP CONSTRAINT product_id_foreign_idx')
    ];
  }
};
