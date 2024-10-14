import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './KitchenHome.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrders();
        await fetchAcceptedOrders();
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
    const response = await fetch('http://localhost:5000/orders/received');
    const dataReceived = await response.json();
    setOrders(dataReceived);
  };

  const fetchAcceptedOrders = async () => {
    const response = await fetch('http://localhost:5000/orders/accepted');
    const dataAccepted = await response.json();
    setAcceptedOrders(dataAccepted);
  };

  const handleAccept = async (orderId) => {
    await updateOrderStatus(orderId, "Order Accepted");
    await fetchOrders();
    await fetchAcceptedOrders();
  };

  const handleReject = async (orderId) => {
    await updateOrderStatus(orderId, "Rejected");
    await fetchAcceptedOrders();
  };

  const handleComplete = async (orderId) => {
    await updateOrderStatusComplete(orderId, "Ready");
    await fetchAcceptedOrders();
  };

  const updateOrderStatusComplete = async (orderId, status) => {
    await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, time: new Date(), completionTime: new Date() })
    });
  };

  const updateOrderStatus = async (orderId, status) => {
    await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, time: new Date() })
    });
  };

  const OrderCard = ({ order }) => {
    const isReceived = order.status === "Order Received";
    const isAccepted = order.status === "Order Accepted";
    const [timeElapsed, setTimeElapsed] = useState(getTimeElapsed(order.time));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeElapsed(getTimeElapsed(order.time));
      }, 1000);

      return () => clearInterval(timer);
    }, [order.time]);

    const getTimeColor = (minutes) => {
      if (minutes < 8) return 'text-success';
      if (minutes < 10) return 'text-warning';
      return 'text-danger';
    };

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">ORDER #{order.id.substring(0, 8).toUpperCase()}</h5>
          {/* <p className="card-text"><strong>Status:</strong> {order.status}</p> */}
          <p className="card-text"><strong>Table No:</strong> {order.tableNo}</p>
          <p className="card-text"><strong>Items:</strong></p>
          <ul className="list-unstyled">
            {order.items.map((item, index) => (
              <li key={index}>{item.itemName} x {item.quantity}</li>
            ))}
          </ul>
          <p className="card-text"><strong>Notes:</strong> {order.notes}</p>
          {isAccepted && (
            <p className={`card-text ${getTimeColor(parseInt(timeElapsed))}`}>
              <strong>Time elapsed:</strong> {timeElapsed}
            </p>
          )}
        </div>
        <div className="card-footer">
          {isReceived && (
            <div className="d-flex justify-content-between">
              <button onClick={() => handleAccept(order.id)} className="btn btn-accept">Accept</button>
              <button onClick={() => handleReject(order.id)} className="btn btn-reject">Reject</button>
            </div>
          )}
          {isAccepted && (
            <button onClick={() => handleComplete(order.id)} className="btn btn-complete w-100">Complete</button>
          )}
        </div>
      </div>
    );
  };

  const getTimeElapsed = (startTime) => {
    const elapsed = new Date() - new Date(startTime);
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }
  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Order Management</h2>
      
      <div className="mb-5">
        <h3 className="mb-3">New Orders</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {orders.map(order => (
            <div key={order.id} className="col">
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="mb-3">Accepted Orders</h3>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {acceptedOrders.map(order => (
            <div key={order.id} className="col">
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;