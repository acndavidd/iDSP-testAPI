'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('trx_collection_det', {
				coll_id: {
					type: Sequelize.STRING(50),
					allowNull: false,
					primaryKey: true
				},
				ar_id: {
					type: Sequelize.STRING(50)
				},
				coll_type: {
					type: Sequelize.STRING(20)
				},
				amount: {
					type: Sequelize.DECIMAL(10,2)
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('trx_collection_det')
		];
	}
};