import React, { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Orders() {
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
    }, [customer._id]);

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
            const response = await fetch(`http://localhost:5000/orders/${customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []); // Ensure data is an array
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    return (
        <>
            <h2>Orders</h2>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Table Number</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((c) => (
                        <tr key={c._id}>
                            <td>{c.date}</td>
                            <td>{c.amount}</td>
                            <td>{c.tableNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Orders;
