'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'quantity')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts', 'quantity', {type: Sequelize.INTEGER})
  }
};
