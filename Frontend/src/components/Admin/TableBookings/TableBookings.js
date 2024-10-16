import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router';

function TableBookings() {
    const [conatct, setContact] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/tableBooking/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.log('Fetched customer data:', data);

            if (response.ok) {
                setContact(data);
            } else {
                console.error('Failed to fetch contact:', response.status);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const onDeleteClick = async(id)=>{
        try {
            const response = await fetch(`http://localhost:5000/tableBooking/${id}`,{
                method:"DELETE",
            });
            if(response.ok){
                alert("Booking Deleted Successfully");
            }
        }catch(err){

        }
    }

    return (
        <>
            <h2>Table bookings</h2>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Number of Persons</th>
                        <th scope="col">Date</th>
                        <th scope='col'>Time</th>
                        <th scope='col'>Delete</th>
                    </tr>   
                </thead>
                <tbody>
                    {conatct.map((c) => (
                        <tr key={c._id}>
                            {/* <td>{c.customer.name}</td> */}
                            <td>{c.noOfPerson}</td>
                            <td>{c.date}</td>
                            <td>{c.time}</td>
                            <td><button className="btn btn-danger" onClick={()=>onDeleteClick(c._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TableBookings
