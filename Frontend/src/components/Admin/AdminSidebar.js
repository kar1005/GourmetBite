import React,{useState} from 'react'
import {Row} from 'react-bootstrap';
import DisplayUpdateMenu from './updateMenu/DisplayUpdateMenu';
import Customers from  './customer/Customers';
import './Admin.css';
import AddCustomer from './customer/AddCustomer';
import UpdateCustomer from './customer/UpdateCustomer';
import BookingRequests from './PartyBookings/BookingRequests';

function AdminSidebar(props) {

  const [selectedOption, setSelectedOption] = useState('orders');
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
                    <li onClick={() => handleOptionClick('menus')}>Menu</li>
                    <li onClick={() => handleOptionClick('customers')}>Customers</li>
                    <li onClick={() => handleOptionClick('partyRequests')}>Party Booking Requests</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
            <Row>
              <>
                {selectedOption === 'menus' && <DisplayUpdateMenu />}
                {selectedOption === 'customers' && <Customers handleClick={handleOptionClick} />}
                {selectedOption === 'createcustomer' && <AddCustomer />}
                {selectedOption === 'updatecustomer' && <UpdateCustomer customerId={selectedCustomerId} />}
                {selectedOption === 'partyRequests' && <BookingRequests />}
              </>
          </Row>
            </div>
        </div>
    </>
  )
}

export default AdminSidebar