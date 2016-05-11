'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
        queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_sub_det ADD CONSTRAINT product_order_id_foreign_idx FOREIGN KEY (product_id, order_id) references trx_saleord_prd_det (product_id, order_id)')
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      //queryInterface.removeColumn('trx_remittance','dsp_id')

        queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_sub_det DROP CONSTRAINT product_order_id_foreign_idx')
    ];
  }
};
