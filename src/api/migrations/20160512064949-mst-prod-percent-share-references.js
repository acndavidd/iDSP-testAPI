'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
        queryInterface
            .changeColumn('mst_prod_percent_share',
            'product_id',
              {
                type: Sequelize.STRING(20),
                references: {
                  model: 'mst_product',
                  key: 'product_id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
              }
            ),
        queryInterface
            .changeColumn('mst_prod_percent_share',
            'retailer_id',
              {
                type: Sequelize.STRING(20),
                references: {
                  model: 'mst_retailer',
                  key: 'retailer_id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
              }
            )
      ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_prod_percent_share DROP CONSTRAINT product_id_foreign_idx'),
      queryInterface.sequelize.query('ALTER TABLE mst_prod_percent_share DROP CONSTRAINT retailer_id_foreign_idx')
    ];
  }
};
