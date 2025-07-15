import React from 'react';
import './App.css';
import { Hometext } from './components/Hometext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Navbar from './Navbar/Navbar';
import Restaurants from './components/Restaurants';
import Lostpassword from './components/Lostpassword';
import About from './components/About';
import Profile from './components/Profile';
import LoginSignup from './LoginSignup/LoginSignup';
import FastDelivery from './components/FastDelivery';
import CartContext from './components/CartContext';
import Payment from './components/Payment'; // Fixed casing

const App = () => {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
           
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path="/forgotpassword" element={<LoginSignup />} />
            <Route path="/home" element={<Hometext />} />
            <Route path="/lostpassword" element={<Lostpassword />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/fastdelivery" element={<FastDelivery />} />
            <Route path="/cart" element={<CartContext />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
};

export default App;