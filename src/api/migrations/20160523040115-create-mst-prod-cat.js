'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('mst_prod_cat',
		{
			category_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING(20)
			},
			category_name: {
				type: Sequelize.STRING(50)
			},
			brand: {
				type: Sequelize.STRING(20)
			},
			sync_status: {
				type: Sequelize.STRING(1)
			},
			sync_version: {
				type: Sequelize.DATE
			},
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('mst_prod_cat');
	}
};