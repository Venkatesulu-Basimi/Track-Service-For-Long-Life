const models =  require('../models');
const logger = require('../services/logger');

async function listCategories() {
    try {
        const categories = await models.Category.findAll()
        return categories;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function listSubCategories(data) {
    try {
        if (!data.categoryId) {
            throw new Error('CategoryId is required');
        }
        const categoryExists = await models.Category.findByPk(data.categoryId);
        if (!categoryExists) {
            throw new Error('Category does not exists');
        }
        const subCategories = await models.SubCategory.findAll({
            where: { categoryId: data.categoryId }
        })
        logger.info('Subcategories listed');
        return subCategories;
    } catch (error) {
        logger.error(error);
         throw error;
    }
}

async function listLineItems(data) {
    try {
        if (!data.subCategoryId) throw new Error('SubCategoryId is required');
        const subCategoryExists = await models.SubCategory.findByPk(data.subCategoryId);
        if (!subCategoryExists) throw new Error('SubCategory does not exists');
        const lineItems = await models.LineItems.findAll({
            where: { subCategoryId: data.subCategoryId }
        })
        logger.info('Line Items listed');
        return lineItems;
    } catch (error) {
        logger.error(error);
         throw error;
    }
}

async function listAdminSubCategories() {
    try {
        const subCategories = await models.SubCategory.findAll({
            include: [
                {
                    model: models.Category
                }
            ]
        })
        logger.info('Subcategories listed');
        return subCategories;
    } catch (error) {
        logger.error(error);
         throw error;
    }
}

module.exports = {
    listCategories,
    listSubCategories,
    listLineItems,
    listAdminSubCategories
}