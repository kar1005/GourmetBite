import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Image, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Orders from './Orders';
import Bookings from './Bookings';
import UpdateProfile from './UpdateProfile';
import { UserCircle, ShoppingBag, CalendarDays, Settings, LogOut } from 'lucide-react';
import PartyBooking from './PartyBooking';

const ProfileLayout = () => {
  const [selectedOption, setSelectedOption] = useState('orders');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [customer, setCustomer] = useState({
    name: '',
    profile_pic: '',
    _id: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setPhoneNumber(decodedToken.phone_no);
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
      if (response.ok) {
        setCustomer(data[0]);
      } else {
        console.error('Failed to fetch customer:', response.status);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tableNumber');
    localStorage.removeItem('cartItems');
    navigate('/');
  };
  return (
    <Container fluid className="mt-5 p-3">
      <Row className="h-100">
        <Col xs={12} md={4} lg={3} className="bg-light p-0 border-end">
          <Card className="h-100 border-0 rounded-0 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-4">
                <Image
                  src={`http://localhost:5000/${customer.profile_pic}`}
                  alt="Customer Profile"
                  roundedCircle
                  width={100}
                  height={100}
                  className="mb-3"
                />
                <h5 className="text-truncate">{customer.name}</h5>
              </div>
              <Nav className="flex-column">
                <Nav.Link
                  active={selectedOption === 'orders'}
                  onClick={() => setSelectedOption('orders')}
                  className="d-flex align-items-center"
                >
                  <ShoppingBag size={18} className="me-2" /> Orders
                </Nav.Link>
                <Nav.Link
                  active={selectedOption === 'bookings'}
                  onClick={() => setSelectedOption('bookings')}
                  className="d-flex align-items-center"
                >
                  <CalendarDays size={18} className="me-2" /> Table Bookings
                </Nav.Link>
                <Nav.Link
                  active={selectedOption === 'partyBooking'}
                  onClick={() => setSelectedOption('partyBooking')}
                  className="d-flex align-items-center"
                >
                  <CalendarDays size={18} className="me-2" /> Party Bookings
                </Nav.Link>
                <Nav.Link
                  active={selectedOption === 'updateProfile'}
                  onClick={() => setSelectedOption('updateProfile')}
                  className="d-flex align-items-center"
                >
                  <Settings size={18} className="me-2" /> Update Profile
                </Nav.Link>
              </Nav>
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="mt-auto d-flex align-items-center justify-content-center"
              >
                <LogOut size={18} className="me-2" /> Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8} lg={9} className="p-3">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              {selectedOption === 'orders' && <Orders />}
              {selectedOption === 'bookings' && <Bookings />}
              {selectedOption === 'updateProfile' && <UpdateProfile />}
              {selectedOption === 'partyBooking' && <PartyBooking />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileLayout;