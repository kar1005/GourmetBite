import React, { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';


function Bookings() {
    const [customer, setCustomer] = useState({ _id: '' });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            fetchCustomerData(decodedToken.phone_no);
        }
    }, []);

    useEffect(() => {
        if (customer._id) {
            fetchOrders(customer._id); // Fetch orders only when customer._id is set
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

    const fetchOrders = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:5000/tableBooking/${customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []); // Ensure data is an array
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };
    return(
        <>
        <h2>Table Bookings</h2>
        <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Book Id</th>
                        <th scope="col">Number Of Persons</th>
                        <th scope="col">Date</th>
                    </tr>   
                </thead>
                <tbody>
                <tbody>
                    {orders.map((c) => (
                        <tr key={c._id}>
                            <td>{c._id}</td>
                            <td>{c.noOfPerson}</td>
                            <td>{c.date}</td>
                        </tr>
                    ))}
                </tbody>
                </tbody>
            </table>
        </>
      );
}

export default Bookings
