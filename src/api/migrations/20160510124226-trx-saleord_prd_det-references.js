'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('trx_saleord_prd_det',
        'product_id',
          {
            type: Sequelize.STRING,
            references: {
              model: 'mst_product',
              key: 'product_id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
        queryInterface
        .changeColumn('trx_saleord_prd_det',
        'order_id',
          {
            type: Sequelize.STRING,
            references: {
              model: 'trx_sales_order',
              key: 'order_id'
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
        queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_det DROP CONSTRAINT product_id_foreign_idx'),
        queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_det DROP CONSTRAINT order_id_foreign_idx')
    ];
  }
};