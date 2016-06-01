'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('trx_saleord_load_det', {
				order_id: {
					type: Sequelize.STRING(50),
					allowNull: false,
					primaryKey: true
				},
				load_id: {
					type: Sequelize.STRING(20),
					allowNull: false,
					primaryKey: true
				},
				amount: {
					type: Sequelize.DECIMAL(10,2)
				},
				promo_code: {
					type: Sequelize.STRING(20)
				},
				promo_amount: {
					type: Sequelize.DECIMAL(10,2)
				},
				rrn: {
					type: Sequelize.STRING(50)
				},
				status: {
					type: Sequelize.STRING(1)
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('trx_saleord_load_det')
		];
	}
};