import { createContext, useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await api.get("/api/cart/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const addToCart = async (bookId, quantity = 1) => {
    try {
      await api.post("/api/cart/cart/add", { bookId, quantity });
      await fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete(`/api/cart/cart/item/${cartItemId}`);
      await fetchCartItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await api.put(`/api/cart/cart/item/${cartItemId}`, { quantity });
      await fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart,setCartItems, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
