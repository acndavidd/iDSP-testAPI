'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn('mst_route_day', 'route_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'mst_route',
					key: 'route_id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.sequelize.query('ALTER TABLE mst_route_day DROP CONSTRAINT route_id_foreign_idx')
		];
	}
};