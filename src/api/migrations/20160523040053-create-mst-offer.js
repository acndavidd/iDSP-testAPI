'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('mst_offer', {
				offer_id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				offer_name: {
					type: Sequelize.STRING(20)
				},
				description: {
					type: Sequelize.STRING(2500)
				},
				image: {
					type: Sequelize.BLOB
				},
				start_date: {
					type: Sequelize.DATE
				},
				end_date: {
					type: Sequelize.DATE
				},
				priority: {
					type: Sequelize.STRING(20)
				},
				outlet_type: {
					type: Sequelize.STRING(100)
				},
				sub_outlet_type: {
					type: Sequelize.STRING(100)
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('mst_offer')
		];
	}
};