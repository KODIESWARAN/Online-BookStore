const Cart = require('../models/cartModel');
const Book = require('../models/bookmodel');
const CartItem = require('../models/cartItemmodel');
const Order = require('../models/ordermodel');
const OrderItem = require('../models/orderItemmodel');
const sequelize = require('../models').sequelize;

const createOrderItems = (cartItems, orderId) => {
    return cartItems.map(item => ({
        OrderId: orderId,
        BookId: item.BookId,
        quantity: item.quantity,
        price: item.Book.price
    }));
};

exports.placeOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const userId = req.user.id;

        // Fetch the cart of the logged-in user
        const cart = await Cart.findOne({
            where: { UserId: userId },
            include: {
                model: CartItem,
                include: Book
            },
            transaction: t
        });

        // Check if cart exists and if it contains items
        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Validate stock for each item in the cart
        for (let item of cart.CartItems) {
            if (item.quantity > item.Book.stock) {
                return res.status(400).json({ message: `Not enough stock for ${item.Book.title}` });
            }
        }

        // Calculate total amount
        let totalAmount = 0;
        cart.CartItems.forEach(item => {
            totalAmount += item.quantity * item.Book.price;
        });

        // Create an order
        const order = await Order.create({
            UserId: userId,
            totalAmount
        }, { transaction: t });

        // Create order items
        const orderItems = createOrderItems(cart.CartItems, order.id);
        await OrderItem.bulkCreate(orderItems, { transaction: t });

        // Clear CartItems after order is placed
        await CartItem.destroy({ where: { CartId: cart.id }, transaction: t });

        // Commit the transaction
        await t.commit();

        // Return success response
        res.status(201).json({ message: "Order placed successfully", OrderId: order.id });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all orders for the logged-in user
        const orders = await Order.findAll({
            where: { UserId: userId },
            include: {
                model: OrderItem,
                include: Book,
            }
        });

        // Map over orders to include total price for each item
        const response = orders.map(order => ({
            ...order.toJSON(),
            orderItems: order.OrderItems.map(item => ({
                ...item.toJSON(),
                totalPrice: item.quantity * item.price // Calculate total price for each order item
            })),
            status: order.status // Include order status
        }));

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        // Only allow admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Fetch all orders
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
        // Only allow admin to update order status
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid order status.' });
        }

        // Find the order by ID
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Update the order status
        order.status = status;
        await order.save();

        res.json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
