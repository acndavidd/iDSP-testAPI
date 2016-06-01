'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn('trx_saleord_prd_det', 'order_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'trx_sales_order',
					key: 'order_id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.sequelize.query('ALTER TABLE trx_saleord_prd_det DROP CONSTRAINT order_id_foreign_idx')
		];
	}
};