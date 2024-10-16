import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Pizza from './../../../assets/pizza.png';
import Salad from './../../../assets/salad.png';
import Party from './../../../assets/party.png';

const mockData = [
  {
    image: Pizza,
    title: "Food Varieties",
    paragraph: "A large variety of food items from across the world, made by experienced and skilled chefs.",
  },
  {
    image: Party,
    title: "Party Bookings",
    paragraph: "Book Hall for your special occasions and get a great special offer on your bill by advance booking.",
  },
  {
    image: Salad,
    title: "Healthy Servings",
    paragraph: "Serving Food filled with nutrients and vitamins that balances your diet.",
  }
];

function Section2() {
  return (
    <>
      <section className="about_section py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="display-4 mb-4">Food tastes better when you eat with your family</h2>
              <p className="lead mb-4">
                Providing seamless user dine-in experience with best food quality and service. We are committed to serving the best food with love and care.
              </p>
              <Link to="/menu" className="btn btn-danger btn-lg">
                View Full Menu
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper py-5 bg-light">
        <Container>
          <Row>
            {mockData.map((cardData, index) => (
              <Col md={6} lg={4} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="about_icon mb-3">
                      <img src={cardData.image} alt={cardData.title} className="img-fluid" style={{maxHeight: '80px'}} />
                    </div>
                    <Card.Title>{cardData.title}</Card.Title>
                    <Card.Text>{cardData.paragraph}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Section2;