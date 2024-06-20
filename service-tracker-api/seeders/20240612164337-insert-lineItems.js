'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('LineItems', [
      // Car Maintenance - Engine and Mechanical
      { id: 1, name: 'Oil Change', subCategoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Engine Tune-up', subCategoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Transmission Service', subCategoryId: 1, createdAt: new Date(), updatedAt: new Date() },

      // Car Maintenance - Electrical
      { id: 4, name: 'Battery Replacement', subCategoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Alternator Check', subCategoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Light Bulb Replacement', subCategoryId: 2, createdAt: new Date(), updatedAt: new Date() },

      // Car Maintenance - Exterior
      { id: 7, name: 'Car Wash', subCategoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Paint Touch-up', subCategoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Windshield Repair', subCategoryId: 3, createdAt: new Date(), updatedAt: new Date() },

      // Car Maintenance - Interior
      { id: 10, name: 'Upholstery Cleaning', subCategoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Air Conditioning Service', subCategoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Dashboard Maintenance', subCategoryId: 4, createdAt: new Date(), updatedAt: new Date() },

      // Car Maintenance - Tires and Brakes
      { id: 13, name: 'Tire Rotation', subCategoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'Brake Pad Replacement', subCategoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Wheel Alignment', subCategoryId: 5, createdAt: new Date(), updatedAt: new Date() },

      // Bike Maintenance - Engine and Mechanical
      { id: 16, name: 'Oil Change', subCategoryId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Chain Lubrication', subCategoryId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 18, name: 'Brake Adjustment', subCategoryId: 6, createdAt: new Date(), updatedAt: new Date() },

      // Bike Maintenance - Electrical
      { id: 19, name: 'Battery Check', subCategoryId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Light Bulb Replacement', subCategoryId: 7, createdAt: new Date(), updatedAt: new Date() },

      // Bike Maintenance - Exterior
      { id: 21, name: 'Bike Wash', subCategoryId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Paint Touch-up', subCategoryId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Seat Maintenance', subCategoryId: 8, createdAt: new Date(), updatedAt: new Date() },

      // Bike Maintenance - Tires and Brakes
      { id: 24, name: 'Tire Inflation', subCategoryId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 25, name: 'Brake Pad Replacement', subCategoryId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 26, name: 'Wheel Alignment', subCategoryId: 9, createdAt: new Date(), updatedAt: new Date() },

      // Electronics Maintenance - Home Appliances
      { id: 27, name: 'Refrigerator Service', subCategoryId: 10, createdAt: new Date(), updatedAt: new Date() },
      { id: 28, name: 'Washing Machine Repair', subCategoryId: 10, createdAt: new Date(), updatedAt: new Date() },
      { id: 29, name: 'Microwave Maintenance', subCategoryId: 10, createdAt: new Date(), updatedAt: new Date() },

      // Electronics Maintenance - Entertainment Systems
      { id: 30, name: 'TV Calibration', subCategoryId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 31, name: 'Speaker System Check', subCategoryId: 11, createdAt: new Date(), updatedAt: new Date() },
      { id: 32, name: 'DVD/Blu-ray Player Service', subCategoryId: 11, createdAt: new Date(), updatedAt: new Date() },

      // Electronics Maintenance - Computers and Peripherals
      { id: 33, name: 'Hardware Upgrades', subCategoryId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 34, name: 'Software Updates', subCategoryId: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: 35, name: 'Virus Scanning', subCategoryId: 12, createdAt: new Date(), updatedAt: new Date() },

      // Home/Office Building Maintenance- Structural
      { id: 36, name: 'Roof Inspection', subCategoryId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 37, name: 'Wall Painting', subCategoryId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 38, name: 'Foundation Repair', subCategoryId: 13, createdAt: new Date(), updatedAt: new Date() },

      // Home/Office Building Maintenance- Plumbing
      { id: 39, name: 'Pipe Leak Repair', subCategoryId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 40, name: 'Faucet Replacement', subCategoryId: 14, createdAt: new Date(), updatedAt: new Date() },
      { id: 41, name: 'Water Heater Maintenance', subCategoryId: 14, createdAt: new Date(), updatedAt: new Date() },

      { id: 42, name: 'Wiring Check', subCategoryId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 43, name: 'Circuit Breaker Maintenance', subCategoryId: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 44, name: 'Outlet Replacement', subCategoryId: 15, createdAt: new Date(), updatedAt: new Date() },

      { id: 45, name: 'Air Filter Replacement', subCategoryId: 16, createdAt: new Date(), updatedAt: new Date() },
      { id: 46, name: 'Furnace Inspection', subCategoryId: 16, createdAt: new Date(), updatedAt: new Date() },
      { id: 47, name: 'Duct Cleaning', subCategoryId: 16, createdAt: new Date(), updatedAt: new Date() },

      { id: 48, name: 'Pruning', subCategoryId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 49, name: 'Fertilizing', subCategoryId: 17, createdAt: new Date(), updatedAt: new Date() },
      { id: 50, name: 'Pest Control', subCategoryId: 17, createdAt: new Date(), updatedAt: new Date() },

      { id: 51, name: 'Mowing', subCategoryId: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: 52, name: 'Aeration', subCategoryId: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: 53, name: 'Weed Control', subCategoryId: 18, createdAt: new Date(), updatedAt: new Date() },

      { id: 54, name: 'Sprinkler System Check', subCategoryId: 19, createdAt: new Date(), updatedAt: new Date() },
      { id: 55, name: 'Drip Irrigation Maintenance', subCategoryId: 19, createdAt: new Date(), updatedAt: new Date() },

      { id: 56, name: 'Fence Repair', subCategoryId: 20, createdAt: new Date(), updatedAt: new Date() },
      { id: 57, name: 'Patio Cleaning', subCategoryId: 20, createdAt: new Date(), updatedAt: new Date() },
      { id: 58, name: 'Garden Lighting Maintenance', subCategoryId: 20, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LineItems', null, {});
  }
};