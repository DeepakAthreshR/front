import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Summary() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const buyData = JSON.parse(localStorage.getItem("buyNow")) || [];
    if (buyData.length === 0) {
      showAlert("No items selected for checkout", () => navigate("/"));
    } else {
      setData(buyData);
    }
  }, []); // <-- Empty array to prevent loop

  const total = data.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>ShopFlow</h1>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
      </nav>

      <h2 className="page-title">Order Summary</h2>
      
      <div className="list-container">
        {data.map((item, i) => (
          <div className="list-item" key={i}>
            <img src={item.image} alt={item.name} />
            <div className="list-item-details">
              <h3>{item.name}</h3>
              <p>Quantity: {item.qty || 1}</p>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              ${item.price * (item.qty || 1)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="total-section">Final Total: ${total}</div>
      <div className="center-action">
        <button className="btn-primary" style={{ width: '300px', padding: '15px' }} onClick={() => navigate("/checkout")}>Confirm & Pay</button>
      </div>
    </div>
  );
}