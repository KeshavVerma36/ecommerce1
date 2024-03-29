import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./buypage.css";

const BASE_IMAGE_URL = 'http://localhost:3000/';

function BuyPage() {
    const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div>Error fetching product: {error.message}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  } else {

    return(
      <div className="parent">
      <div className="child">
        <img src={`${BASE_IMAGE_URL}${product.image}`} alt="Product" />
      </div>
      <div className="child">
        <h4>{product.name}</h4>
        <h6>{product.price}</h6>
      </div>
      <div className="child">
        <p>NAME</p>
        <input type="text" placeholder="enter your name" />
        <p>PHONE NUMBER</p>
        <input type="text" placeholder="enter your phone no." />
        <p>ADDRESS</p>
        <input type="text" placeholder="enter your address" />
      </div>
    </div>
    
    )

}
}
export default BuyPage;