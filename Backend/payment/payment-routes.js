const express = require('express');
const paymentController = require('./payment-controller');
const router = express.Router();

// Route to create an order
router.post('/CreateOrder', paymentController.createOrder);

// Route to verify payment (optional)
router.post('/verify', paymentController.verifyPayment);

module.exports = router;
