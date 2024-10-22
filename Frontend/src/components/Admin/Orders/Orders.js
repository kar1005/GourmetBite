import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Form, Button } from 'react-bootstrap';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setOrders([]);
      fetchOrders(selectedDate);
    }
  }, [selectedDate]);

  const fetchOrders = async (date) => {
    console.log(selectedDate);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/orders/date/${date}`,{
        method:'GET',
      }); // API endpoint with date
      const data = await response.json();
        if (response.ok) {
            console.log("Data:",data);
            setOrders(data);
            console.log("Orders:",orders);
        } else {
          console.error('Failed to fetch orders:', response.status);
        }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const onDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        alert('Order Deleted Successfully');
        fetchOrders(selectedDate); // Refresh orders after deletion
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <h2 className="mb-4">Orders</h2>
        <Form>
          <Form.Group controlId="date">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ width: '200px' }}
            />
          </Form.Group>
        </Form>

        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Row>
              {orders.map((order) => (
                <Col key={order.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Header>Order ID: {order.id} 
                      
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Status: {order.status}</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item><strong>Items:</strong></ListGroup.Item>
                        {order.items.map((item, index) => (
                          <ListGroup.Item key={index}>
                            {item.itemName} - Quantity: {item.quantity}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Card.Text className="mt-3">
                        <strong>Total Amount:</strong> ₹{order.amount}
                      </Card.Text>
                      <button
                          className="btn btn-danger"
                          onClick={() => onDeleteClick(order.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
        )}
      </Container>
    </>
  );
}

export default Orders;
