import React, { useState, useEffect } from 'react';
import {jwtDecode as jwt_decode} from 'jwt-decode';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt_decode(token);
          fetchCustomerData(decodedToken.phone_no);
        }

      }, []);
    
    

      const fetchCustomerData = async (phoneNumber) => {
        try {
          const response = await fetch(`http://localhost:5000/customers/phone/${phoneNumber}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('Fetched customer data:', data[0]); // Log response
    
          if (response.ok) {
            await setUserInfo(data[0]);
            console.log("userInfo ID:",data[0]._id);// Set customer state with fetched data
            fetchOrders(data[0]._id);

          } else {
            console.error('Failed to fetch customer:', response.status);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      };  




  
    const fetchOrders = async (usersID) => {
      try {
        const response = await fetch(`http://localhost:5000/orders/customer/${usersID}`); // Replace with your API endpoint
        const data = await response.json();
        if (response.ok) {
            console.log("Data:",data);
            setOrders(data.orders);
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

    return (
        <Container className="mt-4">
          <h2 className="mb-4">My Orders</h2>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Row>
              {orders.map((order) => (
                <Col key={order.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Header>Order ID: {order.id}</Card.Header>
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
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      );
    
}

export default Orders
