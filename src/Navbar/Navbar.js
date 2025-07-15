import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginSignup from '../LoginSignup/LoginSignup';
import './Navbar.css';
import search from '../assert/search.png';
import foodielogo from '../assert/foodielogo.png';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Function to toggle login/signup form visibility
  const toggleLogin = () => {
    setIsLoginOpen((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
         
          <ul className="nav-links">
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/Restaurants">Restaurants</Link></li>
            <li><Link to="/Foodcourt">Foodcourt</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Profile">Profile</Link></li>
            <li><Link to="/Cart">Cart</Link></li>
            
            <li><Link to="/FastDelivery">Fast Delivery</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="search-box">
            <input type="text" placeholder="Search your food..." />
            <img src={search} alt="Search Icon" className="search-icon" />
          </div>
          <button className="login-btn" onClick={toggleLogin}>
            {isLoginOpen ? 'Close' : 'Sign Up / Login'} 
          </button>
        </div>
      </nav>

      {isLoginOpen && <LoginSignup />}
    </div>
  );
};

export default Navbar;
