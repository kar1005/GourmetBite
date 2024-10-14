import React from 'react'
import { Link } from 'react-router-dom'
import { Container,Row,Col } from 'react-bootstrap'
import Pizza from './../../../assets/pizza.png';
import Salad from './../../../assets/salad.png';
import Party from './../../../assets/party.png';
const mockData = [
  {
    image:Pizza,
    title: "Food Varieties",
    paragraph:"A large varities of food items from across the world, made by experienced and  skilled chefs.",

  },
  {
    image:Party,
    title:"Party Bookings",
    paragraph:"Book Hall for your special occasions and get a great special offer on your bill by advance booking",
  },
  {
    image:Salad,
    title:"Healthy Servings",
    paragraph:"Serving Food filled with nutients and vitamins that balances your diet",
  }
];

function Section2() {
  return (
    <>
      <section className="about_section">
        <Container>
          <Row>
            <Col lg={{span:8,offset:2}} className="text-center">
              <h2>Food tastes better when you eat  with your family</h2>
              <p>
                Providing seamless user dine-in experience with best  food quality and service. We are committed to serving the best food with love and care.
              </p>
              <Link to="/menu" className="btn_red">
                View Full Menu
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          <Row className="justify-content-md-center">{mockData.map((cardData,index)=>(
            <Col md={6} lg={4} className='mb-4 mb-ld-0' key={index}>
                <div className="about_box text-center">
                  <div className="about_icon">
                    <img src={cardData.image} alt="icon" className='img-fluid'/>
                  </div>
                  <h4>{cardData.title}</h4>
                  <p>{cardData.paragraph}</p>
                </div>
            </Col>
          ))}</Row>
        </Container>
      </section>
    </>
  )
}

export default Section2
