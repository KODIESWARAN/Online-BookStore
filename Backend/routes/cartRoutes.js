const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { authenticationJwt } = require('../middleware/authmiddlware');

// Define the routes with appropriate controller methods
router.post('/cart/add', authenticationJwt, addToCart); // Add to cart route
router.get('/cart', authenticationJwt, getCartItems);    // Get cart items route
router.put('/cart/item/:cartItemId', authenticationJwt, updateCartItem); // Update cart item route
router.delete('/cart/item/:cartItemId', authenticationJwt, removeCartItem); // Remove cart item route

module.exports = router;
