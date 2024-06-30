const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const logger = require('../services/logger');

async function listDataCategoriesWise(userId) {
  try {
    let subCategoryIds = [];
    let queryObj = {};

    const userData = await models.User.findByPk(userId);
    if (userData.role !== "Admin") {
      queryObj.userId = userId;
    }

    let queryOptions = {
      where: queryObj,
      include: [
        {
          model: models.LineItems,
          include: [
            {
              model: models.SubCategory,
              attributes: ["id", "name"],
              include: [
                {
                  model: models.Category,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
    };

    let result = await models.Services.findAll(queryOptions);

    const response = result.reduce((acc, item) => {
      const categoryId = item.LineItem.SubCategory.Category.id;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryName: item.LineItem.SubCategory.Category.name,
          totalAmount: 0,
        };
      }
      acc[categoryId].totalAmount += parseFloat(item.amount);
      // logger.info(`Data fetched category wise successfuly`);
      return acc;
    }, {});

    logger.info(`Service Data listed category wise`)
    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function listTotalSumUsers(userId) {
  try {
    let queryObj = {};

    const userData = await models.User.findByPk(userId);
    if (userData.role !== "Admin") {
      queryObj.userId = userId;
    }

    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);

    let serviceExists = await models.Services.findAndCountAll({
        where: queryObj
    });
    let upcomingServices = await models.Services.findAndCountAll({
        include: [
            {
              model: models.LineItems,
              include: [
                {
                  model: models.SubCategory,
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: models.Category,
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
        ],
        where: {
            ...queryObj,
            nextServiceDate: {
                [Op.gt]: now
            }
        },
        order: [
            ['nextServiceDate', 'ASC'],
        ],
    });

    let completedServices = await models.Services.findAndCountAll({
        include: [
            {
              model: models.LineItems,
              include: [
                {
                  model: models.SubCategory,
                  attributes: ["id", "name"],
                  include: [
                    {
                      model: models.Category,
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
        ],
        where: {
            ...queryObj,
            nextServiceDate: {
                [Op.lt]: now
            }
        },
        order: [
            ['nextServiceDate', 'ASC'],
        ],
    });

    let upcomingServicesResult = upcomingServices.rows.map(ele => {
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

    let services = serviceExists.rows.map((ele) => ele.amount);

    let serviceAmount = services.reduce((totalAmount, item) => {
      return (totalAmount += parseFloat(item));
    }, 0);
    
    logger.info(`Total count fetched successfuly`);
    return {
        totalServiceCount: serviceExists.count,
        totalAmount: serviceAmount,
        upcomingServicesCount: upcomingServices.count,
        completedServicesCount: completedServices.count,
        upcomingServices: upcomingServicesResult
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  listDataCategoriesWise,
  listTotalSumUsers,
};
