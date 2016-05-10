'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('mst_product',
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
        ),
        queryInterface
        .changeColumn('mst_product',
        'sub_category_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_prod_sub_category',
              key: 'sub_category_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_product DROP CONSTRAINT category_id_foreign_idx'),
      queryInterface.sequelize.query('ALTER TABLE mst_product DROP CONSTRAINT sub_category_id_foreign_idx')
    ];
  }
};
