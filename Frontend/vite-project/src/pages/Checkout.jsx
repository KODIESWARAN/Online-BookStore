import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../context/CartContext'; // Adjust path if needed

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cart/cart', {
          withCredentials: true,
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [setCartItems]);

  // Calculate total price
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      calculateTotalPrice(cartItems);
    }
  }, [cartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.Book.price, 0);
    setTotalPrice(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      cartItems,
      shippingDetails,
      totalPrice,
      paymentMethod,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/order/add', orderData, {
        withCredentials: true,
      });

      if (response.status === 201 || response.data.success) {
        alert('Order placed successfully!');
        // Optional: clear cart or redirect
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Address</label>
              <textarea
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <h3 className="text-2xl font-semibold mb-4">Payment Method</h3>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={paymentMethod === 'Credit Card'}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                Credit Card
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                PayPal
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md text-lg hover:bg-green-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Order Summary</h2>
          <div className="border p-4 rounded-md bg-gray-50">
            <ul className="space-y-2">
              {Array.isArray(cartItems) && cartItems.map((cart) => (
                <li key={cart.id} className="flex justify-between text-lg">
                  <span>{cart.Book.title}</span>
                  <span>{cart.quantity} × ₹{cart.Book.price}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
