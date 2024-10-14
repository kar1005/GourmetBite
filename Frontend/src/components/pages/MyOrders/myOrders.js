import React, { useState, useEffect } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrders();
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('http://localhost:5000/orders/customer/66e088db398f488807011453');
    const dataReceived = await response.json();
    setOrders(dataReceived);
  };

  console.log(orders.orders);
  
    return(
        <>
        <h1>My Orders</h1>
        </>
    )
}


export default MyOrders;