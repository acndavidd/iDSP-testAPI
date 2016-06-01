'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn('trx_account_receivable', 'order_id',
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
			queryInterface.sequelize.query('ALTER TABLE trx_account_receivable DROP CONSTRAINT order_id_foreign_idx')
		];
	}
};