const Razorpay = require('razorpay');
const OrderSchema = require('../models/orders');


const razorpay = new Razorpay({
  key_id: "rzp_test_9CX0WJkeeVpcmx",
  key_secret: "2KMTb1PuPbF4uqFiHtnenMzV"
});

// Create order
const createOrder = async (req, res) => {
  try {
    const { amount, currency, order} = req.body;
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

  //   // Optional: Store order details in DB
    const newOrder = new OrderSchema({
        customer: order.customer,         // Assuming customer ID is passed
        items: order.items,               // Array of item strings
        notes: order.notes,               // Any notes about the order
        status: order.status,             // Status of the order (e.g., pending, completed)
        tableNo: order.tableNo,           // Table number for the order
        paymentMode: order.paymentMode,   // Payment mode (e.g., Cash, Card, Razorpay)
  
        // Razorpay payment-related fields
        amount: razorpayOrder.amount /100,  // Store amount in rupees
        paymentId: razorpayOrder.id,         // Razorpay Order ID
        Paymentstatus: razorpayOrder.status, // Initial status (created, paid, etc.)
  
        time: Date.now(),          // Current time as default
        completionTime: null,   
    });
        await newOrder.save();
        console.log(razorpayOrder.id);
        
        res.status(200).json({message:'Order added successfully',order:newOrder,amount:amount , currency: currency});//
    }catch{
        res.status(400).json({message:'Error adding order'});
    }
};

// Verify payment (optional)
const verifyPayment = (req, res) => {
  const crypto = require('crypto');
  const { order_id, payment_id, signature } = req.body;

  const hmac = crypto.createHmac('sha256', "2KMTb1PuPbF4uqFiHtnenMzV");
  hmac.update(`${order_id}|${payment_id}`);
  const generatedSignature = hmac.digest('hex');
  
  console.log("Received order_id:", order_id);
  console.log("Received signature:", signature);

  if (generatedSignature === signature) {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }
};

module.exports = { createOrder, verifyPayment };
