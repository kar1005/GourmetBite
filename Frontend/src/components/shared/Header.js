import React,{useState,useEffect} from 'react'
import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo/logo.png";
import './Header.css';

function Header() {

  const [nav, setNav] = useState(false);

  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  window.addEventListener("scroll",changeValueOnScroll);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className= {`${nav === true ? "sticky": ""}`} >
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className='logo'>
              <img src={Logo} alt="No logo available" className="img-fluid"/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                {isAuthenticated?
                <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                <Nav.Link as={Link} to="/booktable">Book Table</Nav.Link>
                <Nav.Link as={Link} to="/ordercart">Order Cart</Nav.Link>
                <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                </>:<>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                <Nav.Link as={Link} to="/login">Authenticate</Nav.Link>
                </>}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    </>
  )
}

export default Header
