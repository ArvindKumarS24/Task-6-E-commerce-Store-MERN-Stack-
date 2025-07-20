import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  return (
    <Router>
      <header className="app-header">
        <nav>
          <Link to="/">🛒 Store</Link>
          <Link to="/cart">Cart ({cartItems.reduce((a, c) => a + c.quantity, 0)})</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<ProductList addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App; // ✅ THIS LINE IS REQUIRED
