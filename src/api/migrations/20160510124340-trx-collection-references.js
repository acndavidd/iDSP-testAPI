'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('trx_collection',
        'dsp_id',
          {
            type: Sequelize.STRING,
            references: {
              model: 'mst_dsp',
              key: 'dsp_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
        queryInterface
        .changeColumn('trx_collection',
        'retailer_id',
          {
            type: Sequelize.STRING,
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
      //queryInterface.removeColumn('trx_remittance','dsp_id')
        queryInterface.sequelize.query('ALTER TABLE trx_collection DROP CONSTRAINT dsp_id_foreign_idx'),
        queryInterface.sequelize.query('ALTER TABLE trx_collection DROP CONSTRAINT retailer_id_foreign_idx')
    ];
  }
};
