const Cart = require('../models/cartModel');
const Book = require('../models/bookmodel');
const CartItem = require('../models/cartItemmodel');
const Order = require('../models/ordermodel');
const OrderItem = require('../models/orderItemmodel');


exports.placeOrder = async(req,res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            where: {UserId : userId},
            include : {
                model : CartItem,
                include : Book
            }
        });

        if(!cart || cart.CartItems.length ===  0){
            return res.status(400).json({message : "cart is empty"})
        }


        let totalAmount = 0;
        cart.CartItems.forEach(item  =>{
            totalAmount += item.quantity * item.Book.price
        })


        const order = await Order.create({
            UserId : userId,
            totalAmount
        })

        const orderItems = cart.CartItems.map(item  => ({
            OrderId :order.id,
            BookId : item.BookId,
            quantity :item.quantity,
            price  :item.Book.price
        }))

        await OrderItem.bulkCreate(orderItems)


        await CartItem.destroy({where :  {CartId : cart.id}})

        res.status(201).json({message : "order placed successfully", OrderId : order.id})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getOrders = async(req,res) =>{
    try {
        const userId = req.user.id;

        const orders = await Order.findAll({
            where  : {UserId : userId},
            include : {
                model : OrderItem,
                include : Book,
            }
        })

        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
      // Only allow admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [Book]
          },
          {
            association: 'User', // Ensure User model is associated with Order
            attributes: ['id', 'name', 'email']
          }
        ]
      });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status.' });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully.', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
