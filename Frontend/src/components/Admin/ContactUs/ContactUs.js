import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router';

function ContactUs() {
    const [conatct, setContact] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/contactus/`, {
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
            const response = await fetch(`http://localhost:5000/contactus/${id}`,{
                method:"DELETE",
            });
            if(response.ok){
                alert("Response Deleted Successfully");
            }
        }catch(err){

        }
    }

    return (
        <>
            <h2>Conatct Us Responses</h2>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                        <th scope='col'>Delete</th>
                    </tr>   
                </thead>
                <tbody>
                    {conatct.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.message}</td>
                            <td><button className="btn btn-danger" onClick={()=>onDeleteClick(c._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ContactUs
