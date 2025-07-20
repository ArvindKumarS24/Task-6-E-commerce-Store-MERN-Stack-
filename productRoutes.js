const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ✅ Make sure this path is correct

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // 👉 This fetches products from MongoDB
    res.json(products);
  } catch (err) {
    console.error('Backend error:', err); // 👈 Show error in terminal
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
