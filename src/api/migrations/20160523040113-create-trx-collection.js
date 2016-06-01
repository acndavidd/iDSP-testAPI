'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('trx_collection', {
				coll_id: {
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
				trans_date: {
					type: Sequelize.DATE
				},
				amount: {
					type: Sequelize.DECIMAL(10,2)
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('trx_collection')
		];
	}
};