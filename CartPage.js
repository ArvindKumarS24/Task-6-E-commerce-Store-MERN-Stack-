import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {

  const [total, setTotal] = useState(0);

  // Fetch cart items
  const fetchCart = () => {
    axios.get('http://localhost:5000/cart')
      .then((res) => {
        setCartItems(res.data);
        calculateTotal(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Total price calculation
  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    axios.put(`http://localhost:5000/cart/${id}`, { quantity })
      .then(() => fetchCart())
      .catch((err) => console.log(err));
  };

  // Remove item
  const removeItem = (id) => {
    axios.delete(`http://localhost:5000/cart/${id}`)
      .then(() => fetchCart())
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeItem(item._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ₹{total}</h4>
        </div>
      )}
    </div>
  );
};

export default CartPage;
