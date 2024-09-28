import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tableNumber, setTableNumber] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });
  const [orderNotes, setOrderNotes] = useState(''); // New state for order notes
  const [savedNotes, setSavedNotes] = useState(''); // New state to store the saved notes

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const items = location.state?.cartItems || JSON.parse(localStorage.getItem('cartItems')) || {};
    const itemsArray = Object.entries(items).map(([id, quantity]) => {
      const item = JSON.parse(localStorage.getItem(`foodItem_${id}`));
      return { ...item, quantity };
    });
    setCartItems(itemsArray);
  }, [location]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
    updateLocalStorage();
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    const cartObject = cartItems.reduce((obj, item) => {
      obj[item._id] = item.quantity;
      return obj;
    }, {});
    localStorage.setItem('cartItems', JSON.stringify(cartObject));
  };

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserInfo({ name: 'John Doe', phone: '123-456-7890' });
  };







  const createOrder = async () => {
    console.log("Creating order");
    
    const orderData = {
        customer: '66e088db398f488807011453', // Replace with actual customer ID
        items: cartItems.map(item => ({ itemId: item._id, qty: item.quantity })),
        notes: savedNotes, // Use the saved notes
        status: "Payment Pending",
        tableNo: tableNumber,
        // paymentMode: '', // Keep empty or set according to your logic
        amount: total, // Use the calculated total amount
        // paymentId: '', // Keep empty or set according to your logic
        // paymentStatus: '', // Keep empty or set according to your logic
        // time: new Date(), // Use current date and time
    };
    console.log(orderData);
    
    try {
        const response = await fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        const data = await response.json();
        console.log('Order created successfully:', data);
        navigate('/razorpay', { state: { order: data.order } });
        // Navigate to the order confirmation page or show a success message
    } catch (error) {
        console.error('Error creating order:', error);
        // Handle error (e.g., show error message to the user)
    }
    console.log("Return from order");
    
};



  const handleCheckout = async () => {
    if (isLoggedIn && tableNumber) {
      
      await createOrder();
      // navigate('/razorpay');
    }
  };

  const handleBackToMenu = () => {
    navigate('/menu', { state: { cartItems: cartItems.reduce((obj, item) => {
      obj[item._id] = item.quantity;
      return obj;
    }, {}) }});
  };

  const handleAddNote = () => {
    setSavedNotes(orderNotes); // Save the input to the savedNotes state
    alert("Note added to the order!");
  };

  const handleRemoveNote = () => {
    setSavedNotes(''); // Clear the saved notes
    alert("Note removed from the order!");
  };

  window.addEventListener('popstate', handleBackToMenu);

  const total = subtotal + 5 - discount; // 5 is the service fee











  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Your Dine-in Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="lead">Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/menu')}>Continue Shopping</button>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                {cartItems.map(item => (
                  <div key={item._id} className="row mb-4 align-items-center">
                    <div className="col-md-2 col-4 mb-2 mb-md-0">
                      <img src={`http://localhost:5000/${item.image}`} alt={item.foodName} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-4 col-8 mb-2 mb-md-0">
                      <h5 className="mb-0">{item.foodName}</h5>
                      <small className="text-muted">₹{item.price.toFixed(2)}</small>
                    </div>
                    <div className="col-md-4 col-8 mb-2 mb-md-0">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, -1)}>
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, 1)}>
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 col-4 text-end">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="mb-3">
                  <label htmlFor="tableNumber" className="form-label">Table Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tableNumber"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter your table number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="coupon" className="form-label">Coupon Code</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="coupon"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={applyCoupon}>Apply</button>
                  </div>
                </div>

                {/* Add customer notes input */}
                <div className="mb-3">
                  <label htmlFor="orderNotes" className="form-label">Add Order Notes</label>
                  <textarea
                    className="form-control"
                    id="orderNotes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Enter any special requests for your order"
                    rows="3"
                  />
                </div>
                <button className="btn btn-outline-secondary mb-3" onClick={handleAddNote}>Add Note</button>

                {savedNotes && (
                  <div className="mb-3">
                    <h6>Saved Notes:</h6>
                    <p>{savedNotes}</p>
                    <button className="btn btn-outline-danger" onClick={handleRemoveNote}>Remove Note</button> {/* Remove button */}
                  </div>
                )}

                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between mb-3 text-success">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-3">
                  <span>Service Fee</span>
                  <span>₹5.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>₹{total.toFixed(2)}</strong>
                </div>
                {isLoggedIn ? (
                  <div className="mb-3">
                    <h6>Order for:</h6>
                    <p className="mb-0">{userInfo.name}</p>
                    <p className="mb-0">{userInfo.phone}</p>
                  </div>
                ) : (
                  <button className="btn btn-secondary w-100 mb-3" onClick={handleLogin}>Login to Checkout</button>
                )}
                <button className="btn btn-primary w-100" onClick={handleCheckout}>Proceed to Checkout</button>
              </div>
            </div>
            <button className="btn btn-outline-secondary w-100" onClick={handleBackToMenu}>Back to Menu</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
