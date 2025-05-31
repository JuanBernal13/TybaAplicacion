const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const locationRoutes = require('./locationRoutes');
const transactionRoutes = require('./transactionRoutes');

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

router.use('/usuarios', userRoutes);
router.use('/restaurants', locationRoutes);
router.use('/transactions', transactionRoutes);
module.exports = router; 