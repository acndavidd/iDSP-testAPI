'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      
      queryInterface
        .changeColumn('trx_sales_call_plan',
        'route_id',
          {
            type: Sequelize.STRING(20),
            references: {
              model: 'mst_route',
              key: 'route_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )
      
      //queryInterface.sequelize.query('ALTER TABLE trx_sales_call_plan ADD CONSTRAINT route_id_day_foreign_idx FOREIGN KEY (route_id, route_day) references mst_route_day (route_id, route_day)')
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      //queryInterface.removeColumn('trx_remittance','dsp_id')
        queryInterface.sequelize.query('ALTER TABLE trx_sales_call_plan DROP CONSTRAINT route_id_foreign_idx')
    ];
  }
};
