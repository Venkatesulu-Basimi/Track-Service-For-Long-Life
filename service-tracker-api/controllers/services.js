const models = require("../models");
const { validateToken } = require("./user");

async function createService(data) {
  try {
    const userExists = await models.User.findByPk(data.userId);
    if (!userExists) throw new Error("User not Exists");
    const lineItemExists = await models.LineItems.findByPk(data.lineItemId);
    if (!lineItemExists) throw new Error("Line Item does not exists");
    const service = await models.Services.create(data);
    return service;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getServiceListing(userId) {
  try {
    const userExists = await models.User.findByPk(userId);
    if (!userExists) throw new Error("User not Exists");
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
      where: {
        userId: userId
      }
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
    return result
  } catch(error) {
    console.log(error);
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
    return service;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function servicesDelete(serviceId, userId) {
  try {
    const serviceExists = await models.Services.findByPk(serviceId);
    if (!serviceExists) throw new Error("Service not Exists");
    await models.Services.destroy({ where: { id: serviceId }});
    return serviceId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createService,
  getServiceListing,
  editService,
  servicesDelete
};
