import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';

const RazorpayPayment = () => {
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Access order data passed from the previous page
    if (location.state && location.state.order) {
      setOrder(location.state.order);
      console.log("in Razorpay: ",order);
      
      setAmount(location.state.amount);
    } else {
      alert('Order data is missing!');
      navigate('/'); // Navigate to another page if order data is missing
    }

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
  }, [location.state, navigate]);


  const UpdateOrderDetails = async (pid) => {
    console.log("---------------------------------------------------------------------");

    try {
      // Update order data with payment info
      const updatedOrderData = {
        ...order,
        status: "Order Received", // Update the status if necessary
        paymentMode: "RazorPay", // Add payment mode
        paymentId: pid // Payment ID from Razorpay
      };
  
      // Send PATCH request to update the order on the backend
      const response = await axios.patch(`http://localhost:5000/orders/${order._id}`, updatedOrderData);
      console.log("----------------------------updatedOrderData-----------------------------------------");
     
      // Check if the order was updated successfully
      if (!response) {
        console.error('Order not found or update failed.');
        return;
        } else {
        console.log('Order updated successfully: ',updatedOrderData);
        return;
      }
    } catch (error) {
      console.error('Error Updating Order:', error);
      return null;
    }
  };
  


  const handlePayment = async () => {
    try {



      console.log(order);
      
      // Send PATCH request to update the order
      const razorpayorder = await axios.post(`http://localhost:5000/paymentroutes/CreateOrder`, order);
      const updatedOrder = razorpayorder.data;
      // Step 2: Check if Razorpay is available in the window object
      if (!window.Razorpay) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }
      // console.log(`Amout :: ${updatedOrder.data.amount}`);
      console.log(`Amout :: ${updatedOrder.amount}`);

      
      // Step 3: Configure Razorpay payment options
      const options = {
        key: 'rzp_test_9CX0WJkeeVpcmx', // Replace with your Razorpay Key ID
        amount: updatedOrder.amount, // Ensure amount is in paise
        currency: "INR",
        name: 'GourmetBite',
        description: 'Complete your order',
        order_id: updatedOrder.id, // Using the updated order ID
        handler: function (response) {
          // Step 4: Payment successful, verify payment on backend
          axios.post('http://localhost:5000/paymentroutes/verify', {
            order_id: updatedOrder.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
          }).then(async () => {
            await UpdateOrderDetails(response.razorpay_payment_id);
            alert('Payment verified and successful!');
            navigate('/profile', { state: { order: updatedOrder } });
          }).catch(() => {
            alert('Payment verification failed!');
          });

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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '25rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          <Card.Title className="text-center">Make a Payment</Card.Title>
          <Card.Text className="text-center mb-4">
            <strong>Your Total Bill is:</strong> ₹{amount}
          </Card.Text>
          <div className="d-grid">
          <Button variant="success" onClick={handlePayment} disabled={!order}>
              Pay Now
            </Button>

          </div>
        </Card.Body>
      </Card>
    </Container>
  );

};

export default RazorpayPayment;
