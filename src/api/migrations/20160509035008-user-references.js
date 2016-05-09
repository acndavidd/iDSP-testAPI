'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [ 
      queryInterface
        .changeColumn('Users',
        'roleID',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Roles',
              key: 'roleID'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
      queryInterface
        .changeColumn('Users',
        'createdBy',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'userID'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        ),
      queryInterface
        .changeColumn('Users',
        'updatedBy',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'userID'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        )
      ];
    },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users','roleID'),
      queryInterface.removeColumn('Users','createdBy'),
      queryInterface.removeColumn('Users','updatedBy')
    ];
  }
};
