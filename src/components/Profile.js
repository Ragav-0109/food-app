import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

// Import icons
import Favourites from '../assert/FaHeart.png';
import FaHome from '../assert/FaHome.png';
import FaUser from '../assert/FaUserCircle.png';
import FaCog from '../assert/FaCog.png';
import FaCreditCard from '../assert/FaCreditCard.png';
import FaMapMarkedAlt from '../assert/FaMapMarkerAlt.png';
import FaShoppingCart from '../assert/FaShoppingCart.png';
import FaSun from '../assert/FaSun.png';
import FaMoon from '../assert/FaMoon.png';
import FaSignOut from '../assert/FaSignOut.png';


export const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="layout">
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav className="nav-menu">
          <div className="nav-item">
            <img src={FaHome} alt='Home' />
            <Link to="/Home">Home</Link>
          </div>
          
          <div className="nav-item">
            <img src={Favourites} alt='Favourites' />
            <Link to="/Favourites">Favourites</Link>
          </div>
          
          <div className="nav-item">
            <img src={FaUser} alt='User' />
            <Link to="/User">User</Link>
          </div>
          
          <div className="nav-item">
            <img src={FaCog} alt='Settings' />
            <Link to="/Settings">Settings</Link>
          </div>
          
          <div className="nav-item">
            <img src={FaCreditCard} alt='Payments' />
            <Link to="/Payments">Payments</Link>
          </div>
          
          <div className="nav-item">
            <img src={FaMapMarkedAlt} alt='Address' />
            <Link to="/Address">Address</Link>
          </div>
          
          <div className="nav-item">
            <img src={FaShoppingCart} alt='Orders' />
            <Link to="/Orders">Orders</Link>
          </div>
          
          {/* Theme Toggle */}
          <div className="nav-item theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? (
              <>
                <img src={FaMoon} alt='Dark Mode' />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <img src={FaSun} alt='Light Mode' />
                <span>Light Mode</span>
              </>
            )}
          </div>

          {/* Logout */}
          <div className="nav-item logout-button" onClick={handleLogout}>
            <img src={FaSignOut} alt='Logout' />
            <span>Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Place your page content here */}
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

export default Profile;
