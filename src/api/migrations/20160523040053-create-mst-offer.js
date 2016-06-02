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
				offer_description: {
					type: Sequelize.STRING(2500)
				},
				offer_picture: {
					type: Sequelize.BLOB
				},
				start_date: {
					type: Sequelize.DATE
				},
				end_date: {
					type: Sequelize.DATE
				},
				sync_status: {
					type: Sequelize.STRING(1)
				},
				sync_version: {
					type: Sequelize.DATE
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