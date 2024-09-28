import React from 'react'
import './Login.css';
import {Link} from 'react-router-dom';


function Login() {
  return (
    <>
        <div className="addUser">
            <h3>Login</h3>
            <form action="" className="addUSerForm">
                <div className="inputGroup">
                    <label htmlFor='email'>Contact No.</label>
                    <input
                        type="number"
                        id="phone"
                        placeholder='Enter your contact no. '
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter your password '
                    />
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                </div>
            </form>
            <div className="signup">
                <p>New Here?</p>
                <Link to="/signup" className="btn btn-success" >
                    Sign Up
                </Link>
            </div>
        </div>
    </>
  )
}

export default Login
