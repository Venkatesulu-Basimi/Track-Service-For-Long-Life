const { createService, getServiceListing, editService, servicesDelete } = require('../controllers/services')
const Joi = require('joi')

const addServiceSchema = Joi.object({
    userId: Joi.number().label('User Id').required(),
    name: Joi.string().required(),
    lineItemId: Joi.number().label('LineItem Id').required(),
    servicedDate: Joi.date(),
    servicedBy: Joi.string(),
    servicedContactNumber: Joi.string(),
    servicedVendor: Joi.string(),
    nextServiceDate: Joi.date(),
    notes: Joi.string()
  });


const updateServiceSchema = Joi.object({
    serviceId: Joi.number().label('Service Id').required(),
    name: Joi.string(),
    lineItemId: Joi.number().label('LineItem Id'),
    servicedDate: Joi.date(),
    servicedBy: Joi.string(),
    servicedContactNumber: Joi.string(),
    servicedVendor: Joi.string(),
    nextServiceDate: Joi.date()
});


async function addServices(req, res) {
    try {
        const data = req.body;
        const { error, value } = addServiceSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createService(data);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getServices(req, res) {
    try {
        const result = await getServiceListing(req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function updateServices(req, res) {
    try {
        const serviceId = req.params.serviceId
        const data = req.body;
        const { error, value } = updateServiceSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await editService(data, serviceId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteService(req, res) {
    try {
        const serviceId = req.params.serviceId
        const result = await servicesDelete(serviceId, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    addServices,
    getServices,
    updateServices,
    deleteService
}