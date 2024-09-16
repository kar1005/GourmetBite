import React from 'react'
import { Link } from 'react-router-dom'
import { Container,Row,Col } from 'react-bootstrap'

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
              <Link to="/" className="btn_red">
                View Full Menu
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          
        </Container>
      </section>
    </>
  )
}

export default Section2
