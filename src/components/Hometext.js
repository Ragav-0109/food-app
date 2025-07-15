import React, { useState } from 'react';
import cook from '../assert/cook.png';
import './Hometext.css';
import { useNavigate } from 'react-router-dom';


export const Hometext = ({ isopen, setOpen = () => {} }) => {
  const navigateLogin = () => {
    setOpen(!isopen);
  };

  return (
    <div>
      <div className='model'>
        <img src={cook} alt='' className='model-image'/>
        <h1>For Customers:</h1>
        <h2 className='model-text'>
          "Welcome to a world of endless flavors! As a foodie, you deserve the best dining experiences, whether you're craving comfort food, gourmet meals, or street-style bites. Discover new restaurants, explore trending dishes, and share your favorite meals with the foodie community. Rate, review, and save your top picks, making every bite count. Your next delicious adventure is just a tap away!"
        </h2>
        <h1>For Restaurants:</h1>
        <h2 className='model-text'>
          "Showcase your culinary creations to a passionate community of food lovers! 
          Connect with customers looking for their next favorite dish, highlight your 
          signature offerings, and receive real-time feedback. Whether you’re a cozy café, 
          a fine-dining spot, or a fast-paced eatery, our platform helps you grow your 
          reach and bring in more happy diners. Let’s turn every meal into a memorable experience!"
        </h2>
    
      </div>
     

    </div>
  );
};


