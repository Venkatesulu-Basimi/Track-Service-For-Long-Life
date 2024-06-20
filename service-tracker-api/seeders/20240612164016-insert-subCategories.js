'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SubCategories', [
      // Car Maintenance Subcategories
      { id: 1, name: 'Engine and Mechanical', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Electrical', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Exterior', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Interior', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Tires and Brakes', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      
      // Bike Maintenance Subcategories
      { id: 6, name: 'Engine and Mechanical', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Electrical', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Exterior', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Tires and Brakes', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },

      // Electronics Maintenance Subcategories
      { id: 10, name: 'Home Appliances', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Entertainment Systems', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Computers and Peripherals', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },

      // Home/Office Building Maintenance Subcategories
      { id: 13, name: 'Structural', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'Plumbing', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Electrical', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'HVAC', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },

      // Garden Maintenance Subcategories
      { id: 17, name: 'Plant Care', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 18, name: 'Lawn Care', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, name: 'Irrigation Systems', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Outdoor Structures', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SubCategories', null, {});
  }
};
