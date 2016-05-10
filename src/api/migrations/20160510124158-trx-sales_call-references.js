'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('trx_sales_call_plan',
        'route_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'mst_route_day',
              key: 'route_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
        queryInterface
        .changeColumn('trx_sales_call_plan',
        'route_day',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'mst_route_day',
              key: 'route_day'
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
        queryInterface.sequelize.query('ALTER TABLE trx_sales_call_plan DROP CONSTRAINT route_id_foreign_idx'),
        queryInterface.sequelize.query('ALTER TABLE trx_sales_call_plan DROP CONSTRAINT route_day_foreign_idx')
    ];
  }
};
