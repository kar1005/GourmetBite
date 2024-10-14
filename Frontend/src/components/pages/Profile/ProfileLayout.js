import React, { useState,useEffect } from 'react';
import './Profile.css';
import {Row} from  'react-bootstrap';
import Orders  from './Orders.js';
import Bookings  from './Bookings.js';
import UpdateProfile  from  './UpdateProfile.js';
import {jwtDecode as jwt_decode} from 'jwt-decode';
import { useNavigate } from 'react-router';

function ProfileLayout() {
    const [selectedOption, setSelectedOption] = useState('orders');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [customer,setCustomer] = useState({
        name: '',
        profile_pic:'',
        _id:'',
    });
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setPhoneNumber(decodedToken.phone_no);
      fetchCustomerData(decodedToken.phone_no);
    }
  }, []);
  const navigate = useNavigate();

  const fetchCustomerData = async (phoneNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/customers/phone/${phoneNumber}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log('Fetched customer data:', data);

      if (response.ok) {
        setCustomer(data[0]); 
        console.log(customer.profile_pic);
      } else {
        console.error('Failed to fetch customer:', response.status);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const Logout = ()=>{
    localStorage.removeItem('token');
    navigate('../');
  }

  return (
    <>
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-section">
          <img src={`http://localhost:5000/${customer.profile_pic}`} alt="Customer Profile" width={150} height={150} className="rounded-pill" />
          <h3 className="profile-name">{customer.name}</h3>
        </div>
        <ul>
          <li onClick={() => handleOptionClick('orders')}>Orders</li>
          <li onClick={() => handleOptionClick('bookings')}>Table Bookings</li>
          <li onClick={() => handleOptionClick('updateProfile')}>Update Profile</li>
          <li onClick={Logout()}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <Row>
        {selectedOption === 'orders' && <Orders />}
        {selectedOption === 'bookings' && <Bookings />}
        {selectedOption === 'updateProfile' && <UpdateProfile />}
        </Row>
      </div>
    </div>
    </>
  )
}

export default ProfileLayout
