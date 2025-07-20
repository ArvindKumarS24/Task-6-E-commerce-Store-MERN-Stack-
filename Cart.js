import React from "react";

function Cart({ cartItems, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item._id}>
                {item.name} - ₹{item.price} × {item.qty}
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
