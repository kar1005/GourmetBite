import React from 'react'
import './Signup.css';
import {Link} from  'react-router-dom';


function Signup() {
  return (
    <>
    <div className="signup-container">
        <div className="addUser">
            <h3>SignUp</h3>
            <form action="" className="addUSerForm">
                <div className="inputGroup">
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Enter your name '
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter your email '
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter your password '
                    />
                    <button type="submit" className="btn btn-success">SIGN UP</button>
                </div>
            </form>
            <div className="login">
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-primary" >
                    Login
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup
