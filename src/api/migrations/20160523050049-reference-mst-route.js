'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn('mst_route', 'freq_map_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'mst_freq_mapping',
					key: 'freq_map_id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			})
		];
	},
	
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.sequelize.query('ALTER TABLE mst_route DROP CONSTRAINT freq_map_id_foreign_idx')
		];
	}
};