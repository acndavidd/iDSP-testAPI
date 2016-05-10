'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_prod_sub_category',
        'category_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_product_category',
              key: 'category_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_prod_sub_category DROP CONSTRAINT category_id_foreign_idx'),
    ];
  }
};
