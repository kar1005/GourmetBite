import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Signup from  "./components/pages/Authenticate/SignUp/Signup";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Menu from './components/pages/Menu/Menu';
import UpdateMenu from './components/Admin/updateMenu/DisplayUpdateMenu';
import UpdateItemForm from './components/Admin/updateMenu/UpdateItemForm';
import CartPage from './components/pages/Menu/cart/CartPage';
import RazorpayPayment from './components/payment/RazorpayPayment';
import KitchenHome from './components/Kitchen/KitchenHome';
import MyOrders from './components/pages/MyOrders/myOrders';
import { AuthProvider } from './components/shared/Auth/auth-context';
import Profile from './components/pages/Profile/Profile';
import Authenticate from './components/pages/Authenticate/Authenticate';
import TableBook from './components/pages/Table Bookings/TableBook';
import AdminMain from './components/Admin/AdminMain';
import AdminSidebar from './components/Admin/AdminSidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  
  useEffect(() => {
    // Simulate token check
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Token check complete
  }, [loading,isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading spinner during token check
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/admin/updateMenu" element={<UpdateMenu />} />
              <Route path="/admin/updateItemForm" element={<UpdateItemForm />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/razorpay" element={<RazorpayPayment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/booktable" element={<TableBook />} />
              <Route path="/admin" element={<AdminMain />} />
              <Route path="/admin/panel" element={<AdminSidebar />} />
              <Route path="/myOrders" element={<MyOrders />} />
              <Route path="/kitchen/home" element={<KitchenHome />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Authenticate />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
