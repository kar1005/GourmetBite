const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: "rzp_test_9CX0WJkeeVpcmx",
  key_secret: "2KMTb1PuPbF4uqFiHtnenMzV"
});

// Create order
const createOrder = async (req, res) => {
  try {
    const { _id , amount } = req.body;
    
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: _id,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    // console.log(options);
  // console.log(razorpayOrder);
      
    res.json(razorpayOrder);//
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(400).json({ message: 'Error adding order', error: error.message });
  }
};

// Verify payment (optional)
const verifyPayment = (req, res) => {
  const crypto = require('crypto');
  const { order_id, payment_id, signature } = req.body;

  const hmac = crypto.createHmac('sha256', "2KMTb1PuPbF4uqFiHtnenMzV");
  hmac.update(`${order_id}|${payment_id}`);
  const generatedSignature = hmac.digest('hex');

  // console.log("Received order_id:", order_id);
  // console.log("Received signature:", signature);

  if (generatedSignature === signature) {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }
};

module.exports = { createOrder, verifyPayment };
