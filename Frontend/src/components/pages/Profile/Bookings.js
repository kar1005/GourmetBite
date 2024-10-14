import React,{useState,useEffect} from 'react'
import {jwtDecode as jwt_decode} from 'jwt-decode';

function Bookings() {
    // const [phoneNumber, setPhoneNumber] = useState(null);
    // const [customer,setCustomer] = useState({
    //     name: '',
    //     profile_pic:'',
    //     _id:'',
    // });
    // const [bookings, setBookings] = useState([]);
    // useEffect(() => {
    //     const fetchBookings = async (id) => {
    //         try {
    //             const response = await fetch('http://localhost:5000/partyBooking/customer/${id}', {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' },
    //             });
    //             const data = await response.json();
    //             setBookings(data); // Ensure 'data' is an array
    //         } catch (err) {
    //             console.error('Error fetching bookings:', err);
    //         }
    //     };
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decodedToken = jwt_decode(token);
    //         setPhoneNumber(decodedToken.phone_no);
    //         fetchCustomerData(decodedToken.phone_no);
    //     }
    //     fetchBookings(id);
    // }, []);

    // const fetchCustomerData = async (phoneNumber) => {
    //     try {
    //       const response = await fetch(`http://localhost:5000/customers/phone/${phoneNumber}`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //       });
    //       const data = await response.json();
    //       console.log('Fetched customer data:', data); // Log response
    
    //       if (response.ok) {
    //         setCustomer(data[0]); 
    //         console.log(customer.profile_pic);// Set customer state with fetched data
    //       } else {
    //         console.error('Failed to fetch customer:', response.status);
    //       }
    //     } catch (err) {
    //       console.error('Error:', err);
    //     }
    // };

    return(
        <>
        <h2>Table Bookings</h2>
        <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Table Number</th>
                    </tr>   
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </>
      );
}

export default Bookings
