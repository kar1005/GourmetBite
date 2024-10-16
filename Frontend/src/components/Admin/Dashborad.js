import React,{useEffect, useState} from 'react'

function Dashborad() {
    const [customer,setCustomer] = useState([]);
    const [order,setOrder] = useState([]);
    const[menu,setMenu] = useState([]);
    const[book,setBook] = useState([]);
    useEffect(()=>{
        fetchCustomer();
        fetchOrders();
        fetchMenu();
        fetchBooking();
    },[]);
    const fetchCustomer = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/customers/`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
              setCustomer(data);
            } else {
              console.error('Failed to fetch customer:', response.status);
            }
          } catch (err) {
            console.error('Error:', err);
        }
    }
    const fetchOrders = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/orders/`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
              setOrder(data);
            } else {
              console.error('Failed to fetch customer:', response.status);
            }
          } catch (err) {
            console.error('Error:', err);
          }
    }
    const fetchMenu = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/menu/`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
              setMenu(data);
            } else {
              console.error('Failed to fetch customer:', response.status);
            }
          } catch (err) {
            console.error('Error:', err);
          }
    }
    const fetchBooking = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/tableBooking/`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
              setBook(data);
            } else {
              console.error('Failed to fetch customer:', response.status);
            }
          } catch (err) {
            console.error('Error:', err);
          }
    }
  return (
    <>
    <h1><center>ADMIN PANEL</center></h1>
        <div className="dashboard">
        <div className="box customer">
            <h3>Total Customers</h3>
            <p id="user-stats">{customer.length}</p>
        </div>
        <div className="box order">
            <h3>Orders</h3>
            <p id="orders-stats">{order.length}</p>
        </div>
        <div className="box menu">
            <h3>Menu Items</h3>
            <p id="revenue-stats">{menu.length}</p>
        </div>
        <div className="box booking">
            <h3>Bookings</h3>
            <p id="sessions-stats">{book.length}</p>
        </div>
    </div>
    </>
  )
}

export default Dashborad
