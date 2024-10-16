import React,{useState,useEffect} from 'react'
import {jwtDecode as jwt_decode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
function PartyBookMainForm() {

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [customer,setCustomer] = useState({
        _id:'',
    });
    const [party,setTable] = useState({
        noOfPerson:'',
        date:'',
        demand:'',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt_decode(token);
          setPhoneNumber(decodedToken.phone_no);
          fetchCustomerData(decodedToken.phone_no);
        }
      }, []);


      const fetchCustomerData = async (phoneNumber) => {
        try {
          const response = await fetch(`http://localhost:5000/customers/phone/${phoneNumber}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('Fetched customer data:', data); // Log response
    
          if (response.ok) {
            setCustomer(data[0]);
            console.log(customer.profile_pic);// Set customer state with fetched data
          } else {
            console.error('Failed to fetch customer:', response.status);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      };  
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setTable((prevData) => ({
        ...prevData,
        [name]:  value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
    
        const bookingData = {
            customer: customer._id, 
            noOfPerson: parseInt(party.noOfPerson),
            date: party.date,
            status:"Not Accepted",
            demands:party.demand
        };
    
        try {
            const response = await fetch(`http://localhost:5000/partyBooking/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Correct Content-Type header for JSON
                },
                body: JSON.stringify(bookingData) // Convert object to JSON string
            });
    
            if (response.ok) {
                alert('Your party booking request is sent successfully.\n Our manager will contact you for the same very soon');
                navigate("/");
            } else {
                const errorMsg = await response.json(); // Get server error message
                alert(`Failed to book table. Error: ${errorMsg.message || response.status}`);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while booking the table.');
        }
    };
  return (
    <>
        <div className="tablebook-container">
            <div className="addTableBook">
            <h3>REQUEST PARTY BOOKING</h3>
            <form onSubmit={handleSubmit} className="bookTableForm">
            <div className="inputGroup">
                <label htmlFor="name">Number Of Persons</label>
                <input
                type="number"
                id="noOfPerson"
                name="noOfPerson" // Added name attribute
                placeholder="Enter number of persons"
                onChange={handleChange}
                />
                <label htmlFor="name">Enter the date of Booking</label>
                <input
                type="date"
                id="date"
                name="date" // Added name attribute
                placeholder="Enter date "
                onChange={handleChange}
                />
                <label htmlFor="message">Demands</label> {/* Fix: Updated htmlFor and label */}
                <textarea
                id="demand" // Added id attribute
                name="demand" // Added name attribute
                placeholder="Enter your demands here"// Fix: Use formData.message as value
                onChange={handleChange} // Fix: Call handleChange on change
                />
                <button type="submit" className="btn btn-primary">BOOK PARTY</button>
            </div>
            </form>
            </div>
        </div>
    </>
  )
}

export default PartyBookMainForm
