'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.createTable('mst_route_day',
			{
				route_id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				route_day: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				sequence: {
					type: Sequelize.INTEGER
				}
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.dropTable('mst_route_day')
		];
	}
};