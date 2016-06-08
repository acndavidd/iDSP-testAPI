'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('mst_prod_sub_cat',
		{
			sub_category_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING(20)
			},
			sub_category_name: {
				type: Sequelize.STRING(50)
			},
			category_id: {
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