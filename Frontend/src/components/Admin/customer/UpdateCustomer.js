import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function UpdateCustomer({ customerId }) {
    const [customer, setCustomer] = useState({
        name: '',
        phone_no: '',
        dob: '',
        gender: '',
        profile_pic: null,
        _id: '',
        password:''
      });
      const [password, setPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [alertMessage, setAlertMessage] = useState('');
      const [alertType, setAlertType] = useState('');
    
      useEffect(() => {
          fetchCustomerData(customerId);
      }, []);
    
      const fetchCustomerData = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/customers/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log(data);
          
          if (response.ok) {
            setCustomer(data);
          } else {
            setAlertMessage('Failed to fetch customer data');
            setAlertType('danger');
          }
        } catch (err) {
          setAlertMessage('Error fetching customer data');
          setAlertType('danger');
        }
      };
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setCustomer((prevData) => ({
          ...prevData,
          [name]: type === "file" ? files[0] : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage('');
        setAlertType('');
      
        if (!password) {
          setAlertMessage('Please enter your current password');
          setAlertType('danger');
          return;
        }
      
        const formDataToSend = new FormData();
        if (customer.profile_pic) {
          formDataToSend.append("profile_pic", customer.profile_pic);
        }
        
        const customerData = JSON.stringify({
          name: customer.name,
          phone_no: customer.phone_no,
          dob: customer.dob,
          gender: customer.gender,
          currentPassword: password,
          newPassword: newPassword || undefined,
          ogPass:customer.password
        });
        
        formDataToSend.append("data", customerData);
      
        // Log FormData contents
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }
      
        try {
          const response = await fetch(`http://localhost:5000/customers/${customer._id}`, {
            method: 'PATCH',
            body: formDataToSend,
          });
      
          if (response.ok) {
            setAlertMessage('Profile updated successfully!');
            setAlertType('success');
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
          setAlertMessage(error.message || 'Failed to update profile. Please try again.');
          setAlertType('danger');
        }
      };
    
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Update Profile</h2>
                  {alertMessage && (
                    <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                      {alertMessage}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage("")}></button>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={customer.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone_no" className="form-label">Contact No.</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone_no"
                          name="phone_no"
                          value={customer.phone_no}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Birth Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          name="dob"
                          value={customer.dob}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="Male"
                              checked={customer.gender === 'Male'}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">Male</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="Female"
                              checked={customer.gender === 'Female'}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="female">Female</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="profile_pic" className="form-label">Profile Picture</label>
                        <input
                          type="file"
                          className="form-control"
                          id="profile_pic"
                          name="profile_pic"
                          onChange={handleChange}
                          accept="image/*"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          // required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="newPassword" className="form-label">New Password (Optional)</label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-grid gap-2 mt-4">
                      <button type="submit" className="btn btn-primary btn-lg">Update Profile</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default UpdateCustomer;
