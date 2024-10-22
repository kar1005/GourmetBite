import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './itemCard.css'; // Import the custom CSS

// Utility function to generate stars based on rating
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star">★</span>
      ))}
      {halfStars > 0 && <span className="star">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star">☆</span>
      ))}
    </>
  );
}

function MenuItemList({ categories, foodItems, categoryRefs, handleEditClick, searchTerm }) {
  return (
    <>
      {!searchTerm ? (
        categories.map((category) => (
          <div key={category} ref={(el) => (categoryRefs.current[category] = el)}>
            <br></br>
            <h3>{category}</h3>
            <hr></hr>
            <Row xs={1} md={2} className="g-4">
              {foodItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Col key={item._id}>
                    <Card className="food-item-card h-100">
                      <Row className="g-0 h-100">
                        <Col xs={12} md={4} className="card-img-col">
                          <Card.Img
                            src={`http://localhost:5000/${item.image}`}
                            alt={item.foodName}
                            className="card-image"
                          />
                        </Col>
                        <Col xs={12} md={8}>
                          <Card.Body className="d-flex flex-column">
                            <Card.Title>{item.foodName}</Card.Title>
                            <div className="rating">
                              {renderStars(item.rating)}
                              <span className="rating-text">{item.rating} ratings</span>
                            </div>
                            <p className="price">₹{item.price}</p>
                            <Card.Text className="food-description flex-grow-1">
                              {item.description}
                            </Card.Text>
                            <Button 
                              className="btn-add-to-cart mt-auto" 
                              onClick={() => handleEditClick(item)}
                            >
                              Update <span className="plus-sign">+</span>
                            </Button>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))
      ) : (
        <Row xs={1} md={2} className="g-4">
          {foodItems.map((item) => (
            <Col key={item._id}>
              <Card className="food-item-card h-100">
                <Row className="g-0 h-100">
                  <Col xs={12} md={4} className="card-img-col">
                    <Card.Img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.foodName}
                      className="card-image"
                    />
                  </Col>
                  <Col xs={12} md={8}>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{item.foodName}</Card.Title>
                      <div className="rating">
                        {renderStars(item.rating)}
                        <span className="rating-text">{item.rating} ratings</span>
                      </div>
                      <p className="price">₹{item.price}</p>
                      <Card.Text className="food-description flex-grow-1">
                        {item.description}
                      </Card.Text>
                      <Button 
                        className="btn-add-to-cart mt-auto" 
                        onClick={() => handleEditClick(item)}
                      >
                        Update <span className="plus-sign">+</span>
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default MenuItemList;