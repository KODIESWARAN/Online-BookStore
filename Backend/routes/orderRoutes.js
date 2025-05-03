const express = require('express');
const router = express.Router();

const {placeOrder, getOrders,getAllOrders, updateOrderStatus} = require('../controllers/orderController')
const {authenticationJwt} = require('../middleware/authmiddlware')


router.post('/add' , authenticationJwt,placeOrder)
router.get('/orders', authenticationJwt,getOrders)
router.get('/admin/orders', authenticationJwt, getAllOrders);
router.patch('/admin/orders/:orderId', authenticationJwt, updateOrderStatus);



module.exports = router