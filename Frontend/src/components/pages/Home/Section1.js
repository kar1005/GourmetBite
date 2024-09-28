import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Restaurant from '../../../assets/mern1.jpg'
import {Link}  from 'react-router-dom'
import './Home.css';

function Section1() {
  return (
    <section className='hero_section'>
        <Container>
            <Row>
                <Col lg={5}>
                    <div className="hero_text text-center me">
                        <h1 className="text-black">Welcome to our restaurant</h1>
                        <h3 className="pt-2 pb-4">
                            Get the best Dine-in experience with our Restaurant.
                        </h3>
                        <Link to="/" className="order_now">
                            Order Now
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Section1
