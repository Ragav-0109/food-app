const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
const Item = mongoose.model('Item', itemSchema);        
module.exports = Item;
// or export default Item; if using ES6 modules
// Compare this snippet from app/src/components/Item.js:
// import React from 'react';
// import './Item.css';


// const Item = ({ name, description, price, category, imageUrl }) => {
//   return (   
//     <div className="item-card">
//       <img src={imageUrl} alt={name} className="item-image" />
//       <div className="item-details">
//         <h3 className="item-name">{name}</h3>
//         <p className="item-description">{description}</p>
//         <p className="item-price">${price}</p>

//         <p className="item-category">{category}</p>
//       </div>
//     </div>
//   );

//   );
// };   
// export default Item;
// // Compare this snippet from app/src/components/ItemList.js:     
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Item from './Item'; // Adjust the path if necessary
// import './ItemList.css'; // Adjust the path if necessary
//
// const ItemList = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   const [error, setError] = useState(null);
//              
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/items'); // Adjust the URL if necessary
//         setItems(response.data);
//       } catch (err) {
//         setError(err);