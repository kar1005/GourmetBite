import React,{useState,useEffect} from 'react'

function BookingRequests() {
    const [update,setUpdate]=useState(1);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/partyBooking/', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setBookings(data); // Ensure 'data' is an array
            } catch (err) {
                console.error('Error fetching bookings:', err);
            }
        };
        fetchBookings();
    }, []);

    const updateBookingStatus = async (id, status) => {
        try {
            await fetch(`http://localhost:5000/partyBooking/${id}`, {
                method: 'PATCH', // Use PATCH to update only specific fields
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }) // Only updating the status field
            });
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === id ? { ...booking, status } : booking
                )
            );
        } catch (err) {
            console.error('Error updating booking status:', err);
        }
        setUpdate(0);
    };

    const onAcceptClick = (id) => {
        updateBookingStatus(id, 'Accepted');
        alert('Party Booking Accepted!!');
    };

    const onRejectClick = (id) => {
        updateBookingStatus(id, 'Rejected');
        alert('Party Booking Rejected!!');
    };

  return (
    <>
        <h2>Party Booking Requests</h2>
        <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Number Of Persons</th>
                        <th scope="col">Date Of Booking</th>
                        <th scope="col">Status</th>
                        <th scope='col'>Demands</th>
                        <th scope="col">Accept</th>
                        <th scope="col">Reject</th>
                    </tr>   
                </thead>
                <tbody>
                    {bookings.map((c) => (
                        <tr key={c._id}>
                            <td>{c.customer.name}</td>
                            <td>{c.noOfPerson}</td>
                            <td>{c.date}</td>
                            <td>{c.status}</td>
                            <td>{c.demands}</td>
                            <td><button className="btn btn-success" onClick={()=>onAcceptClick(c._id)}>Accept</button></td>
                            <td><button className="btn btn-danger" onClick={()=>onRejectClick(c._id)}>Reject</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </>
  )
}

export default BookingRequests
