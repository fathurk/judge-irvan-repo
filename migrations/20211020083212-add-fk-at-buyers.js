'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Buyers', 'AccountId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Accounts',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Buyers', 'AccountId')
  }
};
