const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get all cart items
router.get('/', async (req, res) => {
  const cart = await Cart.find();
  res.json(cart);
});

// Add to cart
router.post('/', async (req, res) => {
  const { productId } = req.body;
  const item = await Cart.findById(productId); // ideally you'd use Item model to fetch details
  const cartItem = new Cart({
    name: item.name,
    price: item.price,
    quantity: 1,
  });
  await cartItem.save();
  res.json({ message: 'Added to cart' });
});

// Update quantity
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;
  await Cart.findByIdAndUpdate(req.params.id, { quantity });
  res.json({ message: 'Quantity updated' });
});

// Delete item
router.delete('/:id', async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item removed' });
});

module.exports = router;
