import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Authenticate/Login/Login"
import Signup from  "./components/pages/Authenticate/SignUp/Signup"
import ContactUs from "./components/pages/ContactUs/ContactUs"

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/contactus" element={<ContactUs />}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
