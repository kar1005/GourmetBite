import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
<<<<<<< HEAD
import Login from "./components/pages/Authenticate/Login/Login"
import Signup from  "./components/pages/Authenticate/SignUp/Signup"
import ContactUs from "./components/pages/ContactUs/ContactUs"
=======
import Login from "./components/pages/Authenticate/Login"
import Signup from  "./components/pages/Authenticate/Signup"
import Menu from './components/pages/Menu/Menu';
import UpdateMenu from './components/Admin/updateMenu/DisplayUpdateMenu';
import UpdateItemForm from './components/Admin/updateMenu/UpdateItemForm';
import CartPage from './components/pages/Menu/cart/CartPage';
import RazorpayPayment from './components/payment/RazorpayPayment';
>>>>>>> e9c7dace0916cd3f83caf5d87a946cc4b59f6c88

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
<<<<<<< HEAD
            <Route path="/contactus" element={<ContactUs />}/>
=======
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/admin/updateMenu' element={<UpdateMenu/>}/>
            <Route path='/admin/updateItemForm' element={<UpdateItemForm/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path="/razorpay" element={<RazorpayPayment />} />

>>>>>>> e9c7dace0916cd3f83caf5d87a946cc4b59f6c88
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
