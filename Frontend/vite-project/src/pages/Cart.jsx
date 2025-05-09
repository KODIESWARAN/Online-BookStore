import { useContext, useEffect } from "react";
import axios from "axios";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/cart/cart",
          {
            withCredentials: true,
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  const handleRemoveFromCart = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleQuantityChange = (cartItemId, quantity) => {
    if (quantity < 1) quantity = 1;
    updateQuantity(cartItemId, quantity);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-sm bg-white"
            >
              <img
                src={item.Book.imageURL}
                alt={item.Book.title}
                className="w-28 h-36 object-cover rounded"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">{item.Book.title}</h3>
                <p className="text-gray-600">{item.Book.author}</p>
                <p className="text-lg font-medium">₹{item.Book.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    min="1"
                    className="w-14 text-center border rounded px-2 py-1"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Link
          to="/checkout"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
