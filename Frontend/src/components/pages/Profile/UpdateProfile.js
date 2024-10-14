import React, { useState, useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {jwtDecode as jwt_decode} from 'jwt-decode';

function UpdateProfile() {
  const [customer, setCustomer] = useState({
    name: '',
    phone_no: '',
    dob: '',
    gender: '',
    profile_pic: null, // for profile picture
    password: '',
    _id:'',
  });

  const navigate = useNavigate();

  // Fetch customer data based on the token
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
      console.log('Fetched customer data:', data); // Log response

      if (response.ok) {
        setCustomer(data[0]); // Set customer state with fetched data
      } else {
        console.error('Failed to fetch customer:', response.status);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setCustomer((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : name === "image" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData here
    formData.append('name', customer.name);
    formData.append('phone_no', customer.phone_no);
    formData.append('dob', customer.dob);
    formData.append('gender', customer.gender);
    if (customer.profile_pic) {
      formData.append('profile_pic', customer.profile_pic);
    }
    formData.append('password', customer.password);
    
    try {
        const response = await fetch(`http://localhost:5000/customers/${customer._id}`, {
            method: 'PATCH',
            body: formData,
        });
        if (response.ok) {
            alert('Profile updated successfully');
            navigate('../profile');
        } else {
            console.error('Failed to update profile:', response.status);
        }
    } catch (err) {
        console.error('Error updating profile:', err);
    }
};
  

  return (
    <>
      <div className="update-container">
        <form className="addUSerForm" encType="multipart/form-data" onSubmit={handleSubmit} method="POST">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleChange}
            />
            <label htmlFor="phone">Contact No.</label>
            <input
              type="number"
              id="phone"
              name="phone_no"
              value={customer.phone_no}
              onChange={handleChange}
            />
            <label htmlFor="dob">BirthDate</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={customer.dob}
              onChange={handleChange}
            />
            <label htmlFor="gender">Gender</label>
            <div className="radio-group">
              <input type="radio" name="gender" value="Male" checked={customer.gender === 'Male'} onChange={handleChange} /> Male
              <input type="radio" name="gender" value="Female" checked={customer.gender === 'Female'} onChange={handleChange} /> Female
            </div>
            <label htmlFor="profilepic">Profile Picture</label>
            <input
              type="file"
              id="profile"
              name="profile_pic"
              placeholder="Upload your profile photo"
              accept="image/*"
              onChange={handleChange} // Handle profile picture upload
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-success">UPDATE</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
