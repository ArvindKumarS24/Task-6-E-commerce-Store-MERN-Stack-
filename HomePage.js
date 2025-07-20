import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    axios.post('http://localhost:5000/cart', { productId: product._id })
      .then(() => alert('Added to cart!'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4 d-flex flex-wrap justify-content-start">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default HomePage;
const addToCart = (product) => {
  axios.post('http://localhost:5000/cart', {
    name: product.name,
    price: product.price,
    quantity: 1,
  })
  .then(() => alert('Added to cart!'))
  .catch((err) => console.error(err));
};
