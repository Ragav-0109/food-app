import React, { useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import './payment.css';

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Payment = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [addressSaved, setAddressSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    country: 'India',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    deliveryInstructions: '',
    defaultAddress: false,
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const autofillLocation = () => {
    // Simulate autofill (you can connect to Geolocation API here)
    setFormData((prev) => ({
      ...prev,
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      area: 'Fort',
      flat: 'Office 12',
      landmark: 'Near CST Station',
    }));
  };

  const validateAddressForm = () => {
    const { name, mobile, pincode, flat, area, city, state } = formData;
    if (!name || !mobile || !pincode || !flat || !area || !city || !state) {
      alert('Please fill in all required delivery address fields.');
      return false;
    }
    if (mobile.length !== 10 || isNaN(mobile)) {
      alert('Mobile number should be 10 digits.');
      return false;
    }
    if (pincode.length !== 6 || isNaN(pincode)) {
      alert('Pincode should be 6 digits.');
      return false;
    }
    return true;
  };

  const validatePaymentForm = () => {
    if (!validateAddressForm()) return false;

    if (paymentMethod === 'card') {
      const { cardNumber, expiryDate, cvv } = formData;
      if (!cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all card details.');
        return false;
      }
    }
    if (paymentMethod === 'upi' && !formData.upiId) {
      alert('Please enter your UPI ID.');
      return false;
    }
    if (paymentMethod === 'netbanking') {
      const { bankName, bankAccountNumber, ifscCode } = formData;
      if (!bankName || !bankAccountNumber || !ifscCode) {
        alert('Please fill all bank details.');
        return false;
      }
    }
    return true;
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (validateAddressForm()) {
      setAddressSaved(true);
      alert('Address saved successfully!');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validatePaymentForm()) return;
    setLoading(true);

    try {
      const orderResponse = await axios.post('/api/orders/create', {
        items: cart,
        total: calculateTotal(),
        deliveryAddress: {
          ...formData,
        },
      });

      const paymentDetails = paymentMethod === 'card' ? {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv
      } : paymentMethod === 'upi' ? {
        upiId: formData.upiId
      } : {
        bankName: formData.bankName,
        bankAccountNumber: formData.bankAccountNumber,
        ifscCode: formData.ifscCode
      };

      const paymentResponse = await axios.post('/api/payment/process', {
        orderId: orderResponse.data.orderId,
        amount: calculateTotal(),
        paymentMethod,
        paymentDetails,
      });

      if (paymentResponse.data.success) {
        alert('Payment successful! Order confirmed.');
        clearCart();
        window.location.href = `/order-confirmation/${orderResponse.data.orderId}`;
      } else {
        throw new Error(paymentResponse.data.message);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert(`Payment failed: ${error.message || 'Please try again'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-wrapper">
      {/* Order Summary Section */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="payment-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="payment-total">
          <strong>Total: ${calculateTotal()}</strong>
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="order-summary">
        <h2>Enter Delivery Address</h2>
        <button type="button" className="autofill-button" onClick={autofillLocation}>
          Autofill Current Location
        </button>

        <form onSubmit={handleSaveAddress}>
          <div className="form-group">
            <label>Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI (Google Pay, PhonePe, Paytm)</option>
              <option value="netbanking">Net Banking</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Flat, House no., Building, Apartment</label>
            <input type="text" name="flat" value={formData.flat} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Area, Street, Village</label>
            <input type="text" name="area" value={formData.area} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Landmark</label>
            <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Town/City</label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleInputChange} required>
              <option value="">Choose a state</option>
              {statesOfIndia.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="payment-button" disabled={loading}>
            {loading ? 'Saving...' : 'Use this Address'}
          </button>
        </form>
      </div>

      {/* Payment Form Section */}
      {addressSaved && (
        <div className="payment-form-section">
          <h2>Payment Details</h2>
          <form onSubmit={handlePayment} className="payment-form">
            {/* Payment specific fields based on payment method */}
            {paymentMethod === 'card' && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" name="cardNumber" maxLength="16" value={formData.cardNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" name="expiryDate" placeholder="MM/YY" maxLength="5" value={formData.expiryDate} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="password" name="cvv" maxLength="3" value={formData.cvv} onChange={handleInputChange} required />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="payment-button" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${calculateTotal()}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;
