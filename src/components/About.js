import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page-layout">
      <h1 className="page-title">About Us</h1>
      <div className="page-content">
        <p>
          Welcome to Foodie! We are passionate about delivering delicious meals to your doorstep. 
          Our mission is to connect food lovers with their favorite restaurants quickly and conveniently.
          With thousands of restaurant partners and millions of satisfied customers, we've become one of
          the most trusted food delivery platforms.
        </p>
        <h2 className="sub-title">Our Commitment</h2>
        <p>
          We're committed to providing the best food delivery experience through innovative technology,
          reliable service, and partnerships with top-rated restaurants. Join millions of satisfied
          customers who trust us for their dining needs.
        </p>

        <h2 className="sub-title">Why Choose Us?</h2>
        <ul className="about-list">
          <li>🚀 Fast and reliable delivery</li>
          <li>🍽️ Wide variety of cuisines</li>
          <li>💳 Secure payments</li>
          <li>❤️ Customer satisfaction is our priority</li>
          <li>🌟 24/7 customer support</li>
          <li>✨ Best prices guaranteed</li>
        </ul>

        <h2 className="sub-title">Our Services</h2>
        <ul className="about-list">
          <li>🔍 Real-time restaurant tracking</li>
          <li>⭐ Restaurant ratings and reviews</li>
          <li>🎁 Exclusive deals and discounts</li>
          <li>📱 Easy-to-use mobile app</li>
          <li>🗺️ Multiple location support</li>
          <li>🔔 Push notifications</li>
          <li>📞 In-app customer service</li>
        </ul>

        <h2 className="sub-title">Features</h2>
        <ul className="about-list">
          <li>📍 Live order tracking</li>
          <li>💰 Multiple payment options</li>
          <li>🎨 Personalized recommendations</li>
          <li>📅 Table reservations</li>
          <li>🏆 Loyalty rewards program</li>
          <li>🎫 Digital coupons</li>
          <li>📱 Mobile wallet integration</li>
        </ul>

        <h2 className="sub-title">Our Partners</h2>
        <ul className="about-list">
          <li>🍕 Local restaurants</li>
          <li>🏪 Chain restaurants</li>
          <li>🍜 Cloud kitchens</li>
          <li>🚗 Delivery partners</li>
          <li>🏢 Corporate partners</li>
        </ul>

        <h2 className="sub-title">Safety & Hygiene</h2>
        <ul className="about-list">
          <li>😷 Contactless delivery</li>
          <li>🧴 Regular sanitization</li>
          <li>🌡️ Temperature checks</li>
          <li>📝 Safety certifications</li>
          <li>✅ Quality assurance</li>
          <h2 className="sub-title">Our Impact</h2>
          <li>1M+ Happy Customers</li>          
          <li>5000+ Restaurant Partners</li>          
          <li>100+ Cities Covered</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
