'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('mst_product',
		{
			product_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING(20)
			},
			product_name: {
				type: Sequelize.STRING(50)
			},
			sub_category_id: {
				type: Sequelize.STRING(20)
			},
			price: {
				type: Sequelize.INTEGER
			},
			sync_status: {
				type: Sequelize.STRING(1)
			},
			sync_version: {
				type: Sequelize.DATE
			}
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('mst_prod_cat');
	}
};