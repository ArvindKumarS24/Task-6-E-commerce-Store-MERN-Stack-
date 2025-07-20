import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Failed to load products:', err);
        setError("Something went wrong when loading products. 😢");
      });
  }, []);

  return (
    <div className="container p-4">
      <h2>🛍️ Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p><strong>₹{product.price}</strong></p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
