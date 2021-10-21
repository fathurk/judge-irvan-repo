'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Sellers', 'AccountId', {
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
    return queryInterface.removeColumn('Sellers', 'AccountId')
  }
};
