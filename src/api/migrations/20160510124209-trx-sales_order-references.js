'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('trx_sales_order',
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
        .changeColumn('trx_sales_order',
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
        ),
        queryInterface
        .changeColumn('trx_sales_order',
        'sub_category_id',
          {
            type: Sequelize.STRING,
            references: {
              model: 'mst_prod_sub_cat',
              key: 'sub_category_id'
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
        queryInterface.sequelize.query('ALTER TABLE trx_sales_order DROP CONSTRAINT dsp_id_foreign_idx'),
        queryInterface.sequelize.query('ALTER TABLE trx_sales_order DROP CONSTRAINT retailer_id_foreign_idx'),
        queryInterface.sequelize.query('ALTER TABLE trx_sales_order DROP CONSTRAINT sub_category_id_foreign_idx')
    ];
  }
};
