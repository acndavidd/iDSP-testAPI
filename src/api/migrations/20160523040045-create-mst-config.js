'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('mst_config', {
			config_name: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING(50)
			},
			description: {
				type: Sequelize.STRING(200)
			},
			config_value: {
				type: Sequelize.STRING(200)
			}
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('mst_config');
	}
};