'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
        queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_sub_det ADD CONSTRAINT order_det_id_foreign_idx FOREIGN KEY (order_det_id) references trx_saleord_prd_det (order_det_id)')
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      //queryInterface.removeColumn('trx_remittance','dsp_id')

        queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_sub_det DROP CONSTRAINT order_det_id_foreign_idx')
    ];
  }
};
