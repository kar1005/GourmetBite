import React,{useState,useEffect} from 'react'
import {jwtDecode as jwt_decode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function TableBookMainForm() {

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [customer,setCustomer] = useState({
        _id:'',
    });
    // const [table,setTable] = useState({
    //     noOfPerson:'',
    //     date:'',
    //     time:''
    // });
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
    // const handleChange=(e)=>{
    //     const { name, value } = e.target;
    //     setTable((prevData) => ({
    //     ...prevData,
    //     [name]:  value,
    //     }));
    // }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
    
        // Construct the table booking object as a JSON payload
        const bookingData = {
            customer_id: customer._id, 
            noOfPerson: selectedGuests, 
            date: selectedDate,
            time:selectedTime
        };
    
        try {
            const response = await fetch(`http://localhost:5000/tableBooking/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Correct Content-Type header for JSON
                },
                body: JSON.stringify(bookingData) // Convert object to JSON string
            });
    
            if (response.ok) {
                alert('Your table has been booked successfully');
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
    
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState('Lunch');
    const [showAllSlots, setShowAllSlots] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedGuests, setSelectedGuests] = useState('1 guest');
  
    const lunchTimes = [
      '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', 
      '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM', 
      '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM'
    ];
  
    const dinnerTimes = [
      '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', 
      '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM',
      '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', 
      '9:00 PM', '9:15 PM', '9:30 PM'
    ];
  
    const guests = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6 guests','7 guests','8 guests'];
  
    const visibleTimes = showAllSlots 
      ? (selectedMeal === 'Lunch' ? lunchTimes : dinnerTimes)
      : (selectedMeal === 'Lunch' ? lunchTimes.slice(0, 6) : dinnerTimes.slice(0, 6));
  



      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card shadow-lg">
                <div className="card-body p-5" style={{background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)'}}>
                  <h2 className="text-center mb-4">Book a table</h2>
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        className="form-control shadow-sm"
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a date"
                      />
                    </div>
                    <div className="col-md-6">
                      <select
                        className="form-select shadow-sm"
                        value={selectedGuests}
                        onChange={(e) => setSelectedGuests(e.target.value)}
                      >
                        <option value="">Select number of guests</option>
                        {guests.map(guest => (
                          <option key={guest} value={guest}>{guest}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h5 className="text-center">Select time of day</h5>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className={`btn ${selectedMeal === 'Lunch' ? 'btn-primary' : 'btn-outline-primary'} me-2 shadow-sm`}
                        onClick={() => {
                          setSelectedMeal('Lunch');
                          setSelectedTime(null);
                          setShowAllSlots(false);
                        }}
                      >
                        Lunch
                      </button>
                      <button
                        type="button"
                        className={`btn ${selectedMeal === 'Dinner' ? 'btn-primary' : 'btn-outline-primary'} shadow-sm`}
                        onClick={() => {
                          setSelectedMeal('Dinner');
                          setSelectedTime(null);
                          setShowAllSlots(false);
                        }}
                      >
                        Dinner
                      </button>
                    </div>
                  </div>
                  {selectedMeal && (
                    <div className="mb-4">
                      <h5 className="text-center mb-3">Select your preferred time slot</h5>
                      <div className="d-flex flex-wrap justify-content-center">
                        {visibleTimes.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`btn btn-outline-primary m-1 shadow-sm ${selectedTime === time ? 'active' : ''}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {!showAllSlots && (
                        <div className="text-center mt-2">
                          <button
                            type="button"
                            className="btn btn-link shadow-sm"
                            onClick={() => setShowAllSlots(true)}
                          >
                            View all slots ▾
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-center">
                    <button className="btn btn-success shadow" onClick={handleSubmit}>Book Table</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
//   return (
//     <>
//         <div className="tablebook-container">
//             <div className="addTableBook">
//             <h3>TABLE BOOKING</h3>
//             <form onSubmit={handleSubmit} className="bookTableForm">
//             <div className="inputGroup">
//                 <label htmlFor="name">Number Of Persons</label>
//                 <input
//                 type="number"
//                 id="noOfPerson"
//                 name="noOfPerson" // Added name attribute
//                 placeholder="Enter number of persons"
//                 onChange={handleChange}
//                 />
//                 <label htmlFor="name">Enter the date of Booking</label>
//                 <input
//                 type="date"
//                 id="date"
//                 name="date" // Added name attribute
//                 placeholder="Enter date "
//                 onChange={handleChange}
//                 />
//                 <button type="submit" className="btn btn-primary">BOOK TABLE</button>
//             </div>
//             </form>
//             </div>
//         </div>
//     </>
//   )
}

export default TableBookMainForm




// const TableBooking = () => {

// };

// export default TableBooking;