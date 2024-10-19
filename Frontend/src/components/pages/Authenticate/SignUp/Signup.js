import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [userData, setUserData] = useState({
    name: '',
    phone_no: '',
    dob: '',
    password: '',
    gender: '',
    profilepic: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === 'checkbox') {
      setUserData({ ...userData, [name]: checked });
    } else if (name === "profilepic") {
      setUserData({ ...userData, profilepic: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = 'Name is required';
    if (!userData.phone_no) newErrors.phone_no = 'Phone number is required';
    if (!userData.dob) newErrors.dob = 'Date of birth is required';
    if (!userData.gender) newErrors.gender = 'Gender is required';
    if (!userData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/customers/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, submit: error.message });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
              <form onSubmit={onSubmitHandler} className="signup-form" encType='multipart/form-data' method='POST'>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Contact No.</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone_no ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone_no"
                    value={userData.phone_no}
                    onChange={handleChange}
                    placeholder="Enter your contact no."
                  />
                  {errors.phone_no && <div className="invalid-feedback">{errors.phone_no}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Birth Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    id="dob"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Gender</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={userData.gender === "Male"}
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
                      checked={userData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                  {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="profilepic" className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilepic"
                    name="profilepic"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">SIGN UP</button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;