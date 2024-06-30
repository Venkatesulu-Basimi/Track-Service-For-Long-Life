const models = require("../models");
const logger = require('../services/logger');

async function createService(data) {
  try {
    const userExists = await models.User.findByPk(data.userId);
    if (!userExists) throw new Error("User not Exists");
    const lineItemExists = await models.LineItems.findByPk(data.lineItemId);
    if (!lineItemExists) throw new Error("Line Item does not exists");
    const service = await models.Services.create(data);
    logger.info(`Service created successfully`);
    return service;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function getServiceListing(userId) {
  try {
    let queryObj = {}
    const userExists = await models.User.findByPk(userId);
    if (!userExists) throw new Error("User not Exists");

    if(userExists.role === 'User') {
      queryObj.userId = userId
    }
    const services = await models.Services.findAll({
      include: [
        {
          model: models.LineItems,
          attributes: ['name', 'id'],
          include: [
            {
              model: models.SubCategory,
              attributes: ['name', 'id'],
              include: [
                {
                  model: models.Category,
                  attributes: ['name', 'id']
                }
              ]
            }
          ]
        }
      ],
      where: queryObj
    })
    const result = services.map(ele => {
      return ({
        id: ele.id,
        userId: ele.userId,
        name: ele.name,
        servicedDate: ele.servicedDate,
        servicedBy: ele.servicedBy,
        servicedContactNumber: ele.servicedContactNumber,
        servicedVendor: ele.servicedVendor,
        nextServiceDate: ele.nextServiceDate,
        createdAt: ele.createdAt,
        updatedAt: ele.updatedAt,
        notes: ele.notes,
        LineItem: {
          id: ele.LineItem.id,
          name: ele.LineItem.name
        },
        SubCategory: {
          id: ele.LineItem.SubCategory.id,
          name: ele.LineItem.SubCategory.name
        },
        Category: {
          id: ele.LineItem.SubCategory.Category.id,
          name: ele.LineItem.SubCategory.Category.name
        }
      })
    })
    logger.info(`Services listed successfully`);
    return result
  } catch(error) {
    logger.error(error);
    throw error;
  }
}

async function editService(data, serviceId) {
  try {
    const serviceExists = await models.Services.findByPk(serviceId);
    if (!serviceExists) throw new Error("Service not Exists");
    if (data.lineItemId) {
      const lineItemExists = await models.LineItems.findByPk(data.lineItemId);
      if (!lineItemExists) throw new Error("Line Item does not exists");
    }
    const service = await models.Services.update(data, { where: { id: serviceId }});
    logger.info(`Service updated successfully`);
    return service;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function servicesDelete(serviceId, userId) {
  try {
    const serviceExists = await models.Services.findByPk(serviceId);
    if (!serviceExists) throw new Error("Service not Exists");
    await models.Services.destroy({ where: { id: serviceId }});
    logger.info(`Services deleted successfully`);
    return serviceId;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  createService,
  getServiceListing,
  editService,
  servicesDelete
};
