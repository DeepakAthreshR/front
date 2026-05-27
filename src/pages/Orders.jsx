import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    // Fetch orders from our backend for this specific user
    fetch(`http://localhost:5000/api/orders/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders", err);
        setLoading(false);
      });
  }, [navigate, userEmail]);

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>ShopFlow</h1>
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => navigate("/")}>Back to Store</button>
        </div>
      </nav>

      <h2 className="page-title">Order History for {userEmail}</h2>

      <div className="list-container">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: "center" }}>You have no past orders.</p>
        ) : (
          orders.map((order) => (
            <div className="list-item" key={order._id} style={{ display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                <strong>Order ID: {order._id.slice(-6).toUpperCase()}</strong>
                <span style={{ color: '#666' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                  <span>{item.qty}x {item.name}</span>
                  <span>${item.price * item.qty}</span>
                </div>
              ))}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontWeight: 'bold', color: 'var(--primary)' }}>
                <span>Total Amount:</span>
                <span>${order.totalAmount}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '10px' }}>Shipped to: {order.shippingAddress} ({order.paymentMethod.toUpperCase()})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}