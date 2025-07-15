import React, { useState } from 'react';
import { foodItems } from './foodItems';
import { useCart } from './CartContext';

const FastDelivery = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(foodItems.map(item => item.category))];

  // Filter items based on search and category
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      <div style={styles.foodList}>
        {filteredItems.map((item) => (
          <div key={item.id} style={styles.foodItem}>
            <img src={item.image} alt={item.name} style={styles.foodImage} />
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button style={styles.addButton} onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  foodList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  foodItem: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center'
  },
  foodImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default FastDelivery;