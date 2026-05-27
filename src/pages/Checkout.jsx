import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [upi, setUpi] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handlePay = async () => {
    if (!address.trim()) return showAlert("Please enter your shipping address");
    if (!payment) return showAlert("Please select a payment method");

    if (payment === "card") {
      if (card.length !== 16) return showAlert("Invalid card number");
      if (cvv.length !== 3) return showAlert("Invalid CVV");
    } else if (payment === "upi" && !upi) {
      return showAlert("Please enter your UPI ID");
    }

    setIsProcessing(true); // Disable button to prevent double clicks

    // 1. Gather data to send to the database
    const cartItems = JSON.parse(localStorage.getItem("buyNow")) || [];
    const userEmail = localStorage.getItem("loggedInUser");
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

    const orderData = {
      userEmail,
      items: cartItems,
      totalAmount,
      shippingAddress: address,
      paymentMethod: payment
    };

    try {
      // 2. Send the data to your Node.js Backend
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Payment failed');

      // 3. Clear Cart and Redirect on Success
      localStorage.removeItem("cart");
      localStorage.removeItem("buyNow");
      showAlert("Order placed successfully! Thank you.", () => navigate("/orders"));
      
    } catch (error) {
      showAlert("There was an error processing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>ShopFlow</h1>
      </nav>
      
      <div className="auth-container" style={{ marginTop: '40px' }}>
        <h2>Secure Checkout</h2>
        
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#666' }}>Shipping Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, Country" />
        </div>
        
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#666' }}>Payment Method</label>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="">-- Select Payment --</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI / Net Banking</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {payment === "card" && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={card} onChange={(e) => setCard(e.target.value)} placeholder="16-digit Card Number" style={{ flex: 2 }} />
            <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" style={{ flex: 1 }} />
          </div>
        )}

        {payment === "upi" && (
          <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="example@upi" />
        )}

        <button 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '20px', padding: '15px' }} 
          onClick={handlePay}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
        <button className="btn-outline" style={{ width: '100%', marginTop: '10px', padding: '15px' }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
}