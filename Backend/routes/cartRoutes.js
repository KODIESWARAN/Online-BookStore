const express = require('express')
const router = express.Router();
const {authenticationJwt} = require('../middleware/authmiddlware')
const cartController = require('../controllers/cartController')


router.post('/add', authenticationJwt, cartController.addTocart)


router.get('/',authenticationJwt,cartController.getCartItems)


router.put('/item/:cartItemId' , authenticationJwt ,cartController.updateCartItem)

router.delete('/item/:cartItemId', authenticationJwt , cartController.removeCartItem)




module.exports = router