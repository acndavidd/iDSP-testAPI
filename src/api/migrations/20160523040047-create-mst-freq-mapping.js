'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('mst_freq_mapping', {
			freq_map_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			frequency: {
				type: Sequelize.STRING(3)
			},
			schedule_value: {
				type: Sequelize.STRING(50)
			},
			schedule_name: {
				type: Sequelize.STRING(100)
			},
			sync_status:{
				type : Sequelize.STRING(1)
			},
			sync_version:{
				type : Sequelize.DATE
			}
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('mst_freq_mapping');
	}
};