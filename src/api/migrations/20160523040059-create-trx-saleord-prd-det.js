'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('trx_saleord_prd_det', {
				order_id: {
					type: Sequelize.STRING(50),
					allowNull: false,
					primaryKey: true,
				},
				product_id: {
					type: Sequelize.STRING(20),
					allowNull: false,
					primaryKey: true,
				},
				quantity: {
					type: Sequelize.INTEGER
				},
				price: {
					type: Sequelize.DECIMAL(10,2)
				},
				promo_code: {
					type: Sequelize.STRING(20)
				},
				promo_price: {
					type: Sequelize.DECIMAL(10,2)
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('trx_saleord_prd_det')
		];
	}
};