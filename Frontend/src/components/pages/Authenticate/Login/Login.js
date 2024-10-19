import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../shared/Auth/auth-context';
import { Alert, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Login() {
    const [userData, setUserData] = useState({
        phone_no: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/customers/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('token', result.token);
                login(result.token);
                alert('Login Successful!!');
                navigate('../');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please check your connection.');
        }
    };

    return (
        <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="shadow-lg border-0 rounded-lg">
                        <Card.Body className="p-5">
                            <h2 className="text-center font-weight-light mb-4">Login</h2>
                            {error && (
                                <Alert variant="danger" className="mb-4">
                                    {error}
                                </Alert>
                            )}
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="phone_no" className="form-label">Contact No.</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone_no"
                                        name="phone_no"
                                        placeholder="Enter your contact no."
                                        onChange={onChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        onChange={onChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" size="lg">
                                        Login
                                    </Button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <p className="mb-0">
                                    New Here?{' '}
                                    <Link to="/signup" className="text-decoration-none">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;