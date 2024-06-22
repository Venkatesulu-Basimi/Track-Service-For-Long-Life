const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, resetPassword, userListing } = require('./user')
const { categoriesListing, subcategoriesListing, lineItemsListing } = require('./categories')
const { addServices, getServices, updateServices, deleteService } = require('./services')
const { validateToken, checkRole } = require('../controllers/user')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getProfile);
router.put('/profile', validateToken, updateProfile);
router.post('/reset-password', resetPassword);

router.get('/categories', validateToken, categoriesListing)
router.get('/subCategories', validateToken, subcategoriesListing)
router.get('/lineItems', validateToken, lineItemsListing)

router.post('/services', validateToken, checkRole(['User']), addServices)
router.get('/services', validateToken, checkRole(['User']), getServices)  // Get all services related to user
router.put('/services/:serviceId', validateToken, checkRole(['User']), updateServices)
router.delete('/services/:serviceId', validateToken, checkRole(['User']), deleteService)

router.get('/users', validateToken, checkRole(['Admin']), userListing);

module.exports = router;