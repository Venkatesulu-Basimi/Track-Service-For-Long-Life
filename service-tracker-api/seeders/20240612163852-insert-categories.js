'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'Car Maintenance', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Bike Maintenance', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Electronics Maintenance', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Home/Office Building Maintenance', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Garden Maintenance', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
