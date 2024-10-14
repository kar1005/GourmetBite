import React, { useState, useEffect } from 'react';

function UpdateCustomer({ customerId }) {
    const [customer, setCustomer] = useState({
        name: '',
        phone_no: '',
        dob: '',
        gender: '',
        profile_pic: null,
        password: '',
        _id: customerId, // This should reflect the current customerId
    });

    useEffect(() => {
        if (customerId) {
            fetch(`http://localhost:5000/customers/${customerId}`)
                .then(response => response.json())
                .then(data => setCustomer(data))
                .catch(error => console.error('Error fetching customer:', error));
        }
    }, [customerId]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setCustomer((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', customer.name);
        formData.append('phone_no', customer.phone_no);
        formData.append('dob', customer.dob);
        formData.append('gender', customer.gender);
        if (customer.profile_pic) {
            formData.append('profile_pic', customer.profile_pic);
        }
        formData.append('password', customer.password);

        try {
            const response = await fetch(`http://localhost:5000/customers/${customerId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const updatedCustomer = await response.json();
                console.log('Customer updated:', updatedCustomer);
                // Handle success case
            } else {
                console.error('Error updating customer');
            }
        } catch (error) {
            console.error('Error:', error);
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
                            onChange={handleChange}
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

export default UpdateCustomer;
