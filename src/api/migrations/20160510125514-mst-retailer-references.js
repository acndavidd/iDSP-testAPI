'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_retailer',
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
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_retailer DROP CONSTRAINT dsp_id_foreign_idx'),
    ];
  }
};
