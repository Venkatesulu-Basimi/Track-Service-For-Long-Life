const { listDataCategoriesWise, listTotalSumUsers } = require('../controllers/dashboard');

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

module.exports = {
    getDataCategoriesWise,
    getTotalSumUsers
}