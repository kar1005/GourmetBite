import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Caesar Salad', price: 8.99, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 3, name: 'Chocolate Brownie', price: 5.99, quantity: 3, image: '/api/placeholder/80/80' },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [tableNumber, setTableNumber] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    // This is a mock function. In a real app, you'd validate the coupon with the backend.
    if (coupon === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleLogin = () => {
    // This is a mock login. In a real app, you'd implement actual authentication.
    setIsLoggedIn(true);
    setUserInfo({ name: 'John Doe', phone: '123-456-7890' });
  };

  const total = subtotal + 5 - discount; // 5 is the delivery fee

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Your Dine-in Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="lead">Your cart is empty</p>
          <button className="btn btn-primary">Continue Shopping</button>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                {cartItems.map(item => (
                  <div key={item.id} className="row mb-4 align-items-center">
                    <div className="col-md-2 col-4 mb-2 mb-md-0">
                      <img src={item.image} alt={item.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-4 col-8 mb-2 mb-md-0">
                      <h5 className="mb-0">{item.name}</h5>
                      <small className="text-muted">${item.price.toFixed(2)}</small>
                    </div>
                    <div className="col-md-4 col-8 mb-2 mb-md-0">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 col-4 text-end">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>
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
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between mb-3 text-success">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-3">
                  <span>Service Fee</span>
                  <span>$5.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                {isLoggedIn ? (
                  <div className="mb-3">
                    <h6>Order for:</h6>
                    <p className="mb-0">{userInfo.name}</p>
                    <p className="mb-0">{userInfo.phone}</p>
                  </div>
                ) : (
                  <button className="btn btn-secondary w-100 mb-3" onClick={handleLogin}>Login to Proceed</button>
                )}
                <button className="btn btn-primary w-100" disabled={!isLoggedIn || !tableNumber}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;