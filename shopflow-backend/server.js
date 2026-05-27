const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();

// Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json()); // Allows server to understand JSON data

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shopflow_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// API ROUTE 1: Save a new order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// API ROUTE 2: Get orders for a specific user
app.get('/api/orders/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    // Find orders for this email and sort by newest first
    const orders = await Order.find({ userEmail }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));