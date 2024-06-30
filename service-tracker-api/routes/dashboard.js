const { listDataCategoriesWise, listTotalSumUsers } = require('../controllers/dashboard');
const { listLocalServices } = require('../services/serpApi')
const Joi = require('joi')

const getServicesSchema = Joi.object({
    searchText: Joi.string(),
    location: Joi.string()
});

async function getDataCategoriesWise(req, res) {
    try {
        const result = await listDataCategoriesWise(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getTotalSumUsers(req, res) {
    try {
        const result = await listTotalSumUsers(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getLocalServices(req, res) {
    try {
        if (req.query) {
            const { error, value } = getServicesSchema.validate(req.query);
            if (error) {
                throw new Error(error.details[0].message);
            }
        }
        const result = await listLocalServices(req.query);
        res.send(result);
    } catch(error) {
        res.status(400);
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    getDataCategoriesWise,
    getTotalSumUsers,
    getLocalServices
}