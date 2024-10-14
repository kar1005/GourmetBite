import React,{useState,useEffect} from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Signup from  "./components/pages/Authenticate/SignUp/Signup"
import ContactUs from "./components/pages/ContactUs/ContactUs"
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

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  let routes;

  return (
     <AuthProvider>
        <div>
        <Router>
          {/* <Routes>
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
    </> */}
              {isAuthenticated? routes = (
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />}/>
                <Route path='/menu' element={<Menu/>}/>
                <Route path='/admin/updateMenu' element={<UpdateMenu/>}/>
                <Route path='/admin/updateItemForm' element={<UpdateItemForm/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path="/razorpay" element={<RazorpayPayment />} />
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/booktable' element={<TableBook/>}/>
                <Route path='/admin' element={<AdminMain/>}/>
                <Route path='/admin/panel' element={<AdminSidebar/>}/>
                <Route path="/myOrders" element={<MyOrders/>}/>
                <Route path="/kitchen/home" element={<KitchenHome />} />
                </Routes>
              ):
              routes = (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path='/menu' element={<Menu/>}/>
                  <Route path="/login" element={<Authenticate />}/>
                  <Route path="/signup" element={<Signup />}/>
                </Routes>
              )}
          </Router>
        </div>
       </AuthProvider>
  );
}

export default App;
