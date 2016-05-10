'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_dsp',
        'dss_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_dss',
              key: 'dss_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_dsp DROP CONSTRAINT dss_id_foreign_idx'),
    ];
  }
};
