'use strict';
module.exports = {
	up: function(queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn('trx_collection_det', 'ar_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'trx_account_receivable',
					key: 'ar_id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			}),
			queryInterface.changeColumn('trx_collection_det', 'coll_id',
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'trx_collection',
					key: 'coll_id'
				},
				onUpdate: 'cascade',
				onDelete: 'cascade'
			})
		];
	},
	down: function(queryInterface, Sequelize) {
		return [
			queryInterface.sequelize.query('ALTER TABLE trx_collection_det DROP CONSTRAINT ar_id_foreign_idx'),
			queryInterface.sequelize.query('ALTER TABLE trx_collection_det DROP CONSTRAINT coll_id_foreign_idx')
		];
	}
};