'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .changeColumn('mst_retailer_dsp_alert',
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
        )];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query('ALTER TABLE mst_retailer_dsp_alert DROP CONSTRAINT retailer_id_foreign_idx'),
    ];
  }
};
