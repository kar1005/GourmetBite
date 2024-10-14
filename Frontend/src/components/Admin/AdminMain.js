import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

function AdminMain() {

    const [userData,changeUserData] = useState({
        email:'',
        password:'',
    });
    const navigate = useNavigate();
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
        if(userData.email === "admin@admin.com" && userData.password === "admin"){
            console.log("Logged in as admin");
            navigate('./panel');
        }else{
            alert('Wrong Credentials');
            console.log(userData.email);
            console.log(userData.password);
        }
    };
    

  return (
    <>
    <div className="signup-container">
        <div className="addUseradmin">
            <h3>Login</h3>
            <form onSubmit={onSubmitHandler} className="addUSerForm">
                <div className="inputGroup">
                    <label htmlFor='username'>Admin Username</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        placeholder='Enter your admin email '
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
        </div>
        </div>
    </>
  )
}

export default AdminMain
