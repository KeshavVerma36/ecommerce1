import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_IMAGE_URL = 'http://localhost:3000/';

const ProductDetail = () => {
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
    return (
      <div className="product-container card">
      <img className="product-image" src={`${BASE_IMAGE_URL}${product.image}`} alt="Product" />
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        {/* Render other product details here */}
      </div>
    );
  }
};

export default ProductDetail;
