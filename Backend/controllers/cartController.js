const Cart = require('../models/cartModel');
const Book = require('../models/bookmodel');
const CartItem = require('../models/cartItemmodel');

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // Get the logged-in user ID from JWT token
        const { bookId, quantity } = req.body;

        // Check if the book exists
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Find or create a cart for the user
        let cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) {
            cart = await Cart.create({ UserId: userId });
        }

        // Check if the item already exists in the cart
        let cartItem = await CartItem.findOne({
            where: {
                CartId: cart.id,
                BookId: bookId
            }
        });

        // If it exists, update the quantity, else create a new cart item
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
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all items in the cart
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get the user's cart and include related book data
        const cart = await Cart.findOne({
            where: { UserId: userId },
            include: {
                model: CartItem,
                include: Book // Include book details in the cart response
            }
        });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.json(cart.CartItems); // Return the cart items
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        // Find the cart item to update
        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        // Update the quantity and save
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Cart item updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Remove cart item
exports.removeCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;

        // Find and remove the cart item
        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        await cartItem.destroy();

        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
