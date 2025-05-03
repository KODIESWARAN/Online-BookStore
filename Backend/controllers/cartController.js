const Cart = require('../models/cartModel');
const Book = require('../models/bookmodel');
const User = require('../models/usermodel');
const CartItem = require('../models/cartItemmodel');

exports.addTocart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, quantity } = req.body;

        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        let cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) {
            cart = await Cart.create({ UserId: userId });
        }

        let cartItem = await CartItem.findOne({
            where: {
                CartId: cart.id,
                BookId: bookId
            }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartItem.create({
                CartId: cart.id,
                BookId: bookId,
                quantity
            });
        }

        res.status(200).json({ message: 'Book added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            where: { UserId: userId },
            include: {
                model: CartItem,
                include: Book
            }
        });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.json(cart.CartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: "Cart item updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;

        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        await cartItem.destroy();

        res.json({ message: "Cart item removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
