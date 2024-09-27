import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RazorpayPayment = () => {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      return new Promise((resolve) => {
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      // Step 1: Create an order in the backend
      const { data: order } = await axios.post('http://localhost:5000/paymentroutes/CreateOrder', {
        "amount": 500 * 100,
        "currency": "INR",
        "order": {
          "customer": "66e088db398f488807011453",
          "items": ["Pizza", "Pasta"],
          "notes": "Add more Cheese",
          "status": "Received",
          "tableNo": 11,
          "paymentMode": "RazorPay"
        }
      });

      // Store the order ID
      setOrderId(order.id);

      // Step 2: Check if Razorpay is available in the window object
      if (!window.Razorpay) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // Step 3: Configure Razorpay payment options
      const options = {
        key: 'rzp_test_9CX0WJkeeVpcmx', // Replace with your Razorpay Key ID
        amount: order.amount,        
        currency: order.currency,
        name: 'GourmetBite',
        description: 'Complete your order',
        order_id: order.id, // Razorpay Order ID
        handler: function (response) {
          // Step 4: Payment successful, verify payment on backend
          axios.post('http://localhost:5000/paymentroutes/verify', {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
          }).then(() => {
            alert('Payment verified and successful!');
          }).catch(() => {
            alert('Payment verification failed!');
          });
          
          console.log(order.amount);
          console.log(order);
          console.log(order.id);
          console.log(response);
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      // Step 5: Open Razorpay payment window
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPayment;