import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Authenticate/Login"
import Signup from  "./components/pages/Authenticate/Signup"
import Menu from './components/pages/Menu/Menu';
import UpdateMenu from './components/Admin/updateMenu/DisplayUpdateMenu';
import UpdateItemForm from './components/Admin/updateMenu/UpdateItemForm';
import CartPage from './components/pages/Menu/cart/CartPage';
import RazorpayPayment from './components/payment/RazorpayPayment';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/admin/updateMenu' element={<UpdateMenu/>}/>
            <Route path='/admin/updateItemForm' element={<UpdateItemForm/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path="/razorpay" element={<RazorpayPayment />} />

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
