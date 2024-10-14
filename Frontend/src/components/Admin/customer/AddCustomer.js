import { useEffect } from 'react';
import React,{useState} from 'react'
import '../Admin.css';
import {Link, useNavigate} from  'react-router-dom';


function AddCustomer() {
    const [userData,changeUserData] = useState({
        name:'',
        phone_no:'',
        dob:'',
        password:'',
        gender:'',
        profilepic:'',
    });

    const handleChange = (e)=>{
        const { name, value, files,type,checked } = e.target;
        if (type === 'checkbox') {
            changeUserData({ ...userData, [name]: checked });
        }else if (name === "profilepic") {
          changeUserData({ ...userData, profilepic: files[0] });
        } else {
          changeUserData({ ...userData, [name]: value });
        }
    }

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
      
        // Create a new FormData object and append all form fields
        const formData = new FormData();
        formData.append('profilepic', userData.profilepic);
        formData.append('name', userData.name);
        formData.append('phone_no', userData.phone_no);
        formData.append('dob', userData.dob);
        formData.append('gender', userData.gender);
        formData.append('password', userData.password);
      
        try {
          const response = await fetch('http://localhost:5000/customers/', {
            method: 'POST',
            body: formData, // Don't stringify FormData
          });
      
          if(response.ok)
            navigate('/login');
          // Process the response
          const result = await response.json();
          console.log(result); // For debugging
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      

  return (
    <>
    <div className="createuser-container">
        <div className="addUser">
            <h3>Create New Customer</h3>
            <form onSubmit={onSubmitHandler} className="addUSerForm" encType='multipart/form-data' method='POST'>
                <div className="inputGroup">
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        placeholder='Enter your name '
                        onChange={handleChange}
                    />
                    <label htmlFor='phone'>Contact No.</label>
                    <input
                        type="number"
                        id="phone"
                        name='phone_no'
                        placeholder='Enter your contact no. '
                        onChange={handleChange}
                    />
                    <label htmlFor='dob'>BirthDate</label>
                    <input
                        type="date"
                        id="dob"
                        name='dob'
                        placeholder='Enter your birthdate '
                        onChange={handleChange}
                    />
                    <label htmlFor='gender'>Gender</label>
                    <div className="radio-group">
                        <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                        <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                    </div>
                    <label htmlFor='profilepic'>Profile Picture</label>
                    <input
                        type="file"
                        id="profile"
                        name='profilepic'
                        placeholder='Enter your profile photo '
                        accept='image/*'
                        onChange={handleChange}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        placeholder='Enter your password '
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-success">CREATE</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default AddCustomer
