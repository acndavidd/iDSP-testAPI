'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('mst_target',
		{
			target_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			dsp_id: {
				type: Sequelize.STRING(20)
			},
			sub_cat_id:{
				type : Sequelize.STRING(20)
			},
			target_month: {
				type: Sequelize.INTEGER
			},
			target_year: {
				type: Sequelize.INTEGER
			},
			target_qty: {
				type: Sequelize.INTEGER
			}
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('mst_target');
	}
};