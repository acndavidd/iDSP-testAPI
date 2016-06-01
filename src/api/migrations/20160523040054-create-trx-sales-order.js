'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('trx_sales_order', {
				order_id: {
					type: Sequelize.STRING(50),
					allowNull: false,
					primaryKey: true
				},
				dsp_id: {
					type: Sequelize.STRING(20)
				},
				retailer_id: {
					type: Sequelize.STRING(20)
				},
				order_date: {
					type: Sequelize.DATE
				},
				remarks: {
					type: Sequelize.STRING(100)
				},
				total_amount: {
					type: Sequelize.DECIMAL(10,2)
				},
				promo_amount: {
					type: Sequelize.DECIMAL(10,2)
				},
				net_amount: {
					type: Sequelize.DECIMAL(10,2)
				},
				payment_amount: {
					type: Sequelize.DECIMAL(10,2)
				},
				balance: {
					type: Sequelize.DECIMAL(10,2)
				},
				payment_status: {
					type: Sequelize.STRING(20)
				},
				order_status: {
					type: Sequelize.STRING(1)
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('trx_sales_order')
		];
	}
};