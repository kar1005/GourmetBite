const express = require('express');
const { createOrder, verifyPayment } = require('./payment-controller');
const router = express.Router();

// Route to create an order
router.post('/order', createOrder);

// Route to verify payment (optional)
router.post('/verify', verifyPayment);

module.exports = router;
