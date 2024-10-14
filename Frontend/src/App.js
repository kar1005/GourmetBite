import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Authenticate/Login/Login"
import Signup from  "./components/pages/Authenticate/SignUp/Signup"
import ContactUs from "./components/pages/ContactUs/ContactUs"
import Menu from './components/pages/Menu/Menu';
import UpdateMenu from './components/Admin/updateMenu/DisplayUpdateMenu';
import UpdateItemForm from './components/Admin/updateMenu/UpdateItemForm';
import CartPage from './components/pages/Menu/cart/CartPage';
import RazorpayPayment from './components/payment/RazorpayPayment';
import KitchenHome from './components/Kitchen/KitchenHome';
import MyOrders from './components/pages/MyOrders/myOrders';

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
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/admin/updateMenu' element={<UpdateMenu/>}/>
            <Route path='/admin/updateItemForm' element={<UpdateItemForm/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path="/razorpay" element={<RazorpayPayment />} />
            <Route path="/myOrders" element={<MyOrders/>}/>
            <Route path="/kitchen/home" element={<KitchenHome />} />

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
