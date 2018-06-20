'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'albums',
        'Deleted_at',
        Sequelize.DATE, {
          allowNull: true
        }
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('albums', 'Delete_at')];
  }
};