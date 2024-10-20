import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Coupons() {
    const [coupon, setCoupon] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/coupon/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.log('Fetched customer data:', data);

            if (response.ok) {
                setCoupon(data);
            } else {
                console.error('Failed to fetch contact:', response.status);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const onDeleteClick = async(id)=>{
        try {
            const response = await fetch(`http://localhost:5000/coupon/${id}`,{
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
            <h2>Coupons</h2>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Coupon Code</th>
                        <th scope="col">Discount Percentage</th>
                        <th scope='col'>Valid From</th>
                        <th scope='col'>Valid To</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Valid For</th>
                        <th scope='col'>Delete</th>
                    </tr>   
                </thead>
                <tbody>
                    {coupon.map((c) => (
                        <tr key={c._id}>
                            {/* <td>{c.customer.name}</td> */}
                            <td>{c.couponCode}</td>
                            <td>{c.discountPercentage}</td>
                            <td>{c.validFrom}</td>
                            <td>{c.validTo}</td>
                            <td>{c.status}</td>
                            <td>{c.validFor}</td>
                            <td><button className="btn btn-danger" onClick={()=>onDeleteClick(c._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Coupons
