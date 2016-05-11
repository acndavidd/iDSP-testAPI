'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('trx_remittance_det',
        'remit_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'trx_remittance',
              key: 'remit_id'
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
        queryInterface.sequelize.query('ALTER TABLE trx_remittance_det DROP CONSTRAINT remit_id_foreign_idx')
    ];
  }
};
