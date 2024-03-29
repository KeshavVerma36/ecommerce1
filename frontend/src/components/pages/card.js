import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Card() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      // If the product is not in the cart, add it
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[index].quantity++;
      setCartItems(updatedCart);
    }

    // Save cart data to backend
    saveCartData(product.id, 1, product.price); // Assuming quantity is always 1 when adding to cart
  };

  const saveCartData = async (product_id, quantity, price, ) => {
    try {
      await axios.post('http://localhost:3001/api/cart', { product_id, quantity, price  });
      console.log('Cart data saved successfully');
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };

  return (
    <div className="card-container">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
          <Link to={`/api/buy/${item.id}`}>
            <button>Buy Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Card;
