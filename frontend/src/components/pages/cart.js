import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./home.css"
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';

const CartPage = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/cart');
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const removeProduct = async (product_id) => {
    try {
      await axios.post("http://localhost:3001/api/cartdel", { product_id: product_id });
      console.log('Cart data removed successfully');
      setCartData(cartData.filter(item => item.product_id !== product_id));
    } catch (error) {
      console.error("Error deleting cart data:", error);
    }
  }

  const updateQuantity = async (product_id, newQuantity) => {
    try {
      await axios.post("http://localhost:3001/api/cart", { product_id, quantity: newQuantity });
      console.log('Cart data updated successfully');
      setCartData(cartData.map(item =>
        item.product_id === product_id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error("Error updating cart data:", error);
    }
  }

  const addQuantity = async (product_id, currentQuantity) => {  
    const newQuantity = currentQuantity + 1;
    updateQuantity(product_id, newQuantity);
  }

  const lessQuantity = async (product_id, currentQuantity) => {
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(product_id, newQuantity);
    }
  }

  return (
    <div>
      <table align="center">
        <thead>
          <tr>
            <th>NO.</th>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.image}</td>
              <td>{data.product_id}</td>
              <td>
                <button onClick={() => addQuantity(data.product_id, data.quantity)}>+</button>
                {data.quantity}
                <button onClick={() => lessQuantity(data.product_id, data.quantity)}>-</button>
              </td>
              <td>{data.price}</td>
              <td>
                <button onClick={() => removeProduct(data.product_id)}>
                  <RemoveShoppingCartRoundedIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
