import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [upi, setUpi] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handlePay = () => {
    if (!address.trim()) return showAlert("Please enter your shipping address");
    if (!payment) return showAlert("Please select a payment method");

    if (payment === "card") {
      if (card.length !== 16) return showAlert("Invalid card number (must be 16 digits)");
      if (cvv.length !== 3) return showAlert("Invalid CVV (must be 3 digits)");
    } else if (payment === "upi" && !upi) {
      return showAlert("Please enter your UPI ID");
    }

    // Clear cart and trigger success modal, THEN redirect home
    localStorage.removeItem("cart");
    localStorage.removeItem("buyNow");
    showAlert("Order placed successfully! Thank you for shopping with us.", () => navigate("/"));
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

        <button className="btn-primary" style={{ width: '100%', marginTop: '20px', padding: '15px' }} onClick={handlePay}>Place Order</button>
        <button className="btn-outline" style={{ width: '100%', marginTop: '10px', padding: '15px' }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
}