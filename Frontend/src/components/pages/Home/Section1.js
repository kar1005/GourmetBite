import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Restaurant from '../../../assets/mern1.jpg';
import './Home.css';

function Section1() {
  return (
    <section className="hero_section d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10} className="text-center">
            <div className="hero_text bg-white bg-opacity-75 p-4 rounded">
              <h1 className="display-4 text-black fw-bold">Welcome to our restaurant</h1>
              <h3 className="lead text-dark my-4">
                Get the best Dine-in experience with our Restaurant.
              </h3>
              <Link to="/cart" className="btn btn-primary btn-lg order_now">
                Order Now
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section1;