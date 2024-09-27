const Razorpay = require('razorpay');
const Order = require('../models/orders'); // If storing order details


const razorpay = new Razorpay({
  key_id: "rzp_test_9CX0WJkeeVpcmx",
  key_secret: "2KMTb1PuPbF4uqFiHtnenMzV"
});

// Create order
const createOrder = async (req, res) => {
  const { amount, currency,order } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency,
      receipt: order,
    };

    const order = await razorpay.orders.create(options);

    // Optional: Store order details in DB
    const newOrder = new Order({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    });
    await newOrder.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

// Verify payment (optional)
const verifyPayment = (req, res) => {
  const crypto = require('crypto');
  const { order_id, payment_id, signature } = req.body;

  const hmac = crypto.createHmac('sha256', "2KMTb1PuPbF4uqFiHtnenMzV");
  hmac.update(`${order_id}|${payment_id}`);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === signature) {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }
};

module.exports = { createOrder, verifyPayment };
