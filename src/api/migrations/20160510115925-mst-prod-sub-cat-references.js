'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_prod_sub_cat',
        'category_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_prod_cat',
              key: 'category_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_prod_sub_cat DROP CONSTRAINT category_id_foreign_idx'),
    ];
  }
};
