import React, { useState } from 'react';
// import { Row } from 'react-bootstrap';
import TableBookMainForm from './TableBookMainForm';
import PartyBookMainForm from './PartyBookMainForm';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './TableBook.css';

function TableBookForm() {
  const [option, setOption] = useState('tablebook');

  const handleOptionClick = (optionValue) => {
    setOption(optionValue);
  };
  return (
    <Container fluid className="py-5 bg-light">
      <Row className="justify-content-center mb-2 mt-5">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h2 className="mb-4">Make a Reservation</h2>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant={option === 'tablebook' ? 'primary' : 'outline-primary'}
              size="lg"
              onClick={() => handleOptionClick('tablebook')}
              className="w-50"
            >
              Book Table
            </Button>
            <Button
              variant={option === 'partybook' ? 'primary' : 'outline-primary'}
              size="lg"
              onClick={() => handleOptionClick('partybook')}
              className="w-50"
            >
              Book Party
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {option === 'tablebook' && <TableBookMainForm />}
          {option === 'partybook' && <PartyBookMainForm />}
        </Col>
      </Row>
    </Container>
  );
}

export default TableBookForm;
