import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Signup from "./components/pages/Authenticate/SignUp/Signup";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Menu from './components/pages/Menu/Menu';
import UpdateMenu from './components/Admin/updateMenu/DisplayUpdateMenu';
import UpdateItemForm from './components/Admin/updateMenu/UpdateItemForm';
import CartPage from './components/pages/Menu/cart/CartPage';
import RazorpayPayment from './components/payment/RazorpayPayment';
import KitchenHome from './components/Kitchen/KitchenHome';
// import MyOrders from './components/pages/MyOrders/myOrders';
import { AuthProvider } from './components/shared/Auth/auth-context';
import Profile from './components/pages/Profile/Profile';
import Authenticate from './components/pages/Authenticate/Authenticate';
import TableBook from './components/pages/Table Bookings/TableBook';
import AdminMain from './components/Admin/AdminMain';
import AdminSidebar from './components/Admin/AdminSidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(true); // Set authentication state based on token presence
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu/:tableNumber?" element={<Menu />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/cart" element={<CartPage />} />
          {isAuthenticated ? (
            <Route path="/razorpay" element={<RazorpayPayment />} />
          ) : (
            <Route path="/razorpay" element={<Navigate to="/login" />} />
          )}

          {/* Protected Routes */}
          {isAuthenticated ? (
              <Route path="/contactus" element={<ContactUs />} />
          ) : (
            <Route path="/contactus" element={<Navigate to="/login" />} />
          )}
          {isAuthenticated ? (
              <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
          )}
          {isAuthenticated ? (
              <Route path="/booktable" element={<TableBook />} />
          ) : (
            <Route path="/booktable" element={<Navigate to="/login" />} />
          )}
          {isAuthenticated ? (
              <Route path="/kitchen/home" element={<KitchenHome />} />
          ) : (
            <Route path="/kitchen/home" element={<Navigate to="/login" />} />
          )}
              <Route path="/admin" element={<AdminMain />} />
              <Route path="/admin/panel" element={<AdminSidebar />} />
              <Route path="/admin/updateItemForm" element={<UpdateItemForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


