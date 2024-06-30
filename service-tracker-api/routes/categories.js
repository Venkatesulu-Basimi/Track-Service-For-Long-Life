const { listCategories, listSubCategories, listLineItems, listAdminSubCategories } = require('../controllers/categories')

async function categoriesListing(req, res) {
    try {
        const result = await listCategories();
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function subcategoriesListing(req, res) {
    try {
        const data = req.query;
        const result = await listSubCategories(data);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function lineItemsListing(req, res) {
    try {
        const data = req.query;
        const result = await listLineItems(data);
        res.send(result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getAdminSubCategories(req, res) {
    try {
        const result = await listAdminSubCategories();
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    categoriesListing,
    subcategoriesListing,
    lineItemsListing,
    getAdminSubCategories
}