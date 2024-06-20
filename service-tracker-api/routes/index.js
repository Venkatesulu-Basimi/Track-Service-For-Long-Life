const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('./user')
const { categoriesListing, subcategoriesListing, lineItemsListing } = require('./categories')
const { addServices } = require('./services')
const { validateToken } = require('../controllers/user')

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/categories', validateToken, categoriesListing)
router.get('/subCategories', validateToken, subcategoriesListing)
router.get('/lineItems', validateToken, lineItemsListing)

router.post('/services', validateToken, addServices)

module.exports = router;