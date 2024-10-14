import React,{useState,useContext} from 'react'
import './Login.css';
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../shared/Auth/auth-context';

function Login() {

    const [userData,changeUserData] = useState({
        phone_no:'',
        password:'',
    });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const onChangeHandler = (e)=>{
        changeUserData(
            {
                ...userData,
                [e.target.name]:e.target.value,
            }
        );
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`http://localhost:5000/customers/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
    
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            login(result.token);
            alert("Login Successful!!");
            navigate('../');
        } else {
            console.log('Login failed');
            // Handle login error (e.g., set an error state)
        }
    };
    

  return (
    <>
    <div className="login-container">
        <div className="addUserlogin">
            <h3>Login</h3>
            <form onSubmit={onSubmitHandler} className="addUSerForm">
                <div className="inputGroup">
                    <label htmlFor='email'>Contact No.</label>
                    <input
                        type="number"
                        id="phone"
                        name='phone_no'
                        placeholder='Enter your contact no. '
                        onChange={onChangeHandler}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        placeholder='Enter your password '
                        onChange={onChangeHandler}
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
        </div>
    </>
  )
}

export default Login
