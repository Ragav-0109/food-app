import React, { createContext, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Remove unused state if not needed
  // const [paymentIntent, setPaymentIntent] = useState(null);
  // const [clientSecret, setClientSecret] = useState(null);

  // Calculate total value including delivery fee
  const calculateTotal = () => {
    const itemsTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = deliveryOption === 'fast' ? 10.00 : 5.00;
    return (itemsTotal + deliveryFee).toFixed(2);
  };

  // Handle payment and delivery process
  const handleCheckout = async () => {
    try {
      setProcessing(true);
      setError(null);
      const total = calculateTotal();
      
      // Validate cart and total
      if (!cart.length) {
        throw new Error('Your cart is empty');
      }
      
      if (total <= 0) {
        throw new Error('Invalid order total');
      }

      // Create delivery order
      const deliveryResponse = await axios.post('/api/delivery/create', {
        items: cart,
        deliveryOption,
        address: localStorage.getItem('userAddress')
      }).catch(err => {
        throw new Error(err.response?.data?.message || 'Delivery setup failed');
      });

      // Create payment intent
      const intentResponse = await axios.post('/api/payment/create-intent', {
        amount: total,
        deliveryId: deliveryResponse.data.deliveryId,
        currency: 'inr',
      }).catch(err => {
        throw new Error(err.response?.data?.message || 'Payment setup failed');
      });

      if (!intentResponse.data?.success) {
        throw new Error('Could not initialize payment');
      }

      // Process payment
      const paymentResponse = await axios.post('/api/payment/process', {
        amount: total,
        items: cart,
        deliveryId: deliveryResponse.data.deliveryId,
        deliveryOption,
        paymentIntent: intentResponse.data.paymentIntent
      }).catch(err => {
        throw new Error(err.response?.data?.message || 'Payment processing failed');
      });

      if (paymentResponse.data.success) {
        const trackingNumber = deliveryResponse.data.trackingNumber;
        localStorage.setItem('lastOrderTracking', trackingNumber);
        clearCart();
        alert(`Payment successful! Your tracking number is: ${trackingNumber}`);
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message || 'Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Price: ₹{(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          
          <div className="delivery-options">
            <h3>Delivery Options</h3>
            <select 
              value={deliveryOption} 
              onChange={(e) => setDeliveryOption(e.target.value)}
            >
              <option value="standard">Standard Delivery (₹5.00)</option>
              <option value="fast">Fast Delivery (₹10.00)</option>
            </select>
          </div>

          <div className="cart-summary">
            <h3>Total (including delivery):₹{calculateTotal()}</h3>
            <div className="cart-actions">
              <button 
                onClick={clearCart}
                disabled={processing}
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout} 
                disabled={processing || !cart.length}
                className="checkout-button"
              >
                {processing ? 'Processing Payment...' : 'Proceed to Payment'}
              </button>
              <Link to="/payment">
                <button 
                  disabled={processing || !cart.length}
                  className="payment-link-button"
                >
                  Go to Payment Page
                </button>
              </Link>
            </div>
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// CartProvider remains the same
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => 
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default Cart;
