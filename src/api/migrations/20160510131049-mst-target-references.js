'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_target',
        'dsp_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_dsp',
              key: 'dsp_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
      queryInterface
        .changeColumn('mst_target',
        'sub_category_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_prod_sub_cat',
              key: 'sub_category_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
        queryInterface
        .changeColumn('mst_target',
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
        )
      ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_target DROP CONSTRAINT dsp_id_foreign_idx'),
      queryInterface.sequelize.query('ALTER TABLE mst_target DROP CONSTRAINT product_id_foreign_idx')
    ];
  }
};
