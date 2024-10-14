import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import TableBookMainForm from './TableBookMainForm';
import PartyBookMainForm from './PartyBookMainForm';
import './TableBook.css';

function TableBookForm() {
  const [option, setOption] = useState('tablebook');

  const handleOptionClick = (optionValue) => {
    setOption(optionValue);
  };

  return (
    <>
      <div className="bookings">
        <div className="buttons">
        <button
          className="btn btn-outline-primary btn-lg "
          onClick={() => handleOptionClick('tablebook')}
        >
          Book Table
        </button>
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => handleOptionClick('partybook')}
        >
        Book Party
        </button>
        </div>
      <div className="content">
        <Row>
          {option === 'tablebook' && <TableBookMainForm />}
          {option === 'partybook' && <PartyBookMainForm />}
        </Row>
      </div>
      </div>
    </>
  );
}

export default TableBookForm;
