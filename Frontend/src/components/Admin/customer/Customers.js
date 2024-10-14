import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Customers({handleClick}) {
    const [customer, setCustomer] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/customers/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.log('Fetched customer data:', data);

            if (response.ok) {
                setCustomer(data);
            } else {
                console.error('Failed to fetch customer:', response.status);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const onDeleteClick = async(id)=>{
        try {
            const response = await fetch(`http://localhost:5000/customers/${id}`,{
                method:"DELETE",
            });
            if(response.ok){
                alert("Customer Deleted Successfully");
            }
        }catch(err){

        }
    }

    return (
        <>
            <h2>Customers</h2>
            <h3 className="text-right"><button className='order_now' onClick={()=>handleClick('createcustomer')}>Create+</button></h3>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Profile Picture</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>   
                </thead>
                <tbody>
                    {customer.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td><img src={`http://localhost:5000/${c.profile_pic}`} width={50} height={50} className='rounded-pill' alt="" /></td>
                            <td>{c.phone_no}</td>
                            <td>{c.dob}</td>
                            <td>{c.gender}</td>
                            <td><button className="btn btn-primary"  onClick={() => handleClick('updatecustomer',c._id)}>Update</button></td>

                            <td><button className="btn btn-danger" onClick={()=>onDeleteClick(c._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Customers;
