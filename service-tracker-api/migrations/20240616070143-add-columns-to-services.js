'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Services', 'deletedAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Services', 'deletedBy', {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Services', 'deletedAt');
    await queryInterface.changeColumn('Services', 'deletedBy');
  }
};
