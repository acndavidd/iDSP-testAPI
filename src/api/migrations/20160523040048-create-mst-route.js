'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('mst_route',
			{
				route_id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				dsp_id: {
					type: Sequelize.STRING(20)
				},
				retailer_id: {
					type: Sequelize.STRING(20)
				},
				freq_map_id: {
					type: Sequelize.INTEGER
				},
				created_date: {
					type: Sequelize.DATE
				},
				created_by: {
					type: Sequelize.STRING(20)
				},
				updated_date: {
					type: Sequelize.DATE
				},
				updated_by: {
					type: Sequelize.STRING(20)
				}
			})
		];
	},
	
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('mst_route')
		];
	}
};