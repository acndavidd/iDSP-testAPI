'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_dss',
        'dist_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_dist',
              key: 'dist_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_dss DROP CONSTRAINT dist_id_foreign_idx'),
    ];
  }
};
