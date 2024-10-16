import React,{useState} from 'react'
import {Row} from 'react-bootstrap';
import DisplayUpdateMenu from './updateMenu/DisplayUpdateMenu';
import Customers from  './customer/Customers';
import './Admin.css';
import AddCustomer from './customer/AddCustomer';
import UpdateCustomer from './customer/UpdateCustomer';
import BookingRequests from './PartyBookings/BookingRequests';
import AddItemForm from './addItem/addItem';
import Dashboard from './Dashborad';
import TableBooking from './TableBookings/TableBookings';
import ContactUs from './ContactUs/ContactUs';

function AdminSidebar(props) {

  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const handleOptionClick = (option, id = null) => {
    setSelectedOption(option);
    setSelectedCustomerId(id); // Store the customer ID
};

  return (
    <>
        <div className="admin-page">
            <div className="admin-sidebar">
                <ul>
                    <li onClick={() => handleOptionClick('dashboard')}>Dashboard</li>
                    <li onClick={() => handleOptionClick('menus')}>Menu</li>
                    <li onClick={() => handleOptionClick('customers')}>Customers</li>
                    <li onClick={() => handleOptionClick('partyRequests')}>Party Booking Requests</li>
                    <li onClick={() => handleOptionClick('addItem')}>Add Item</li>
                    <li onClick={() => handleOptionClick('tableBooking')}>Table Bookings</li>
                    <li onClick={() => handleOptionClick('contactus')}>Contact Us Responses</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
            <Row>
              <>
                {selectedOption === 'dashboard' && <Dashboard handleClick={handleOptionClick} />}
                {selectedOption === 'menus' && <DisplayUpdateMenu />}
                {selectedOption === 'customers' && <Customers handleClick={handleOptionClick} />}
                {selectedOption === 'createcustomer' && <AddCustomer />}
                {selectedOption === 'updatecustomer' && <UpdateCustomer customerId={selectedCustomerId} />}
                {selectedOption === 'partyRequests' && <BookingRequests />}
                {selectedOption === 'addItem' && <AddItemForm/>}
                {selectedOption === 'tableBooking' && <TableBooking/>}
                {selectedOption === 'contactus' && <ContactUs/>}
              </>
            </Row>
            </div>
        </div>
    </>
  )
}

export default AdminSidebar
