import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length === 0) {
      showAlert("Your cart is empty", () => navigate("/"));
    } else {
      setCart(storedCart);
    }
  }, []); // <-- Empty array ensures this only runs on mount

  const changeQty = (index, delta) => {
    let newCart = [...cart];
    newCart[index].qty = parseInt(newCart[index].qty) + delta;
    if (newCart[index].qty <= 0) newCart.splice(index, 1);
    
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    
    if (newCart.length === 0) navigate("/");
  };

  const removeItem = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    
    if (newCart.length === 0) navigate("/");
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>ShopFlow</h1>
        <button className="btn-secondary" onClick={() => navigate("/")}>Continue Shopping</button>
      </nav>

      <h2 className="page-title">Your Shopping Cart</h2>
      
      <div className="list-container">
        {cart.map((item, i) => (
          <div className="list-item" key={i}>
            <img src={item.image} alt={item.name} />
            <div className="list-item-details">
              <h3>{item.name}</h3>
              <p>${item.price} each</p>
            </div>
            
            <div className="qty-controls">
              <button className="btn-secondary btn-icon" onClick={() => changeQty(i, -1)}>-</button>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.qty}</span>
              <button className="btn-secondary btn-icon" onClick={() => changeQty(i, 1)}>+</button>
              <button className="btn-danger" style={{marginLeft: '15px'}} onClick={() => removeItem(i)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="total-section">Estimated Total: ${total}</div>
      <div className="center-action">
        <button className="btn-primary" style={{ width: '300px', fontSize: '1.1rem', padding: '15px' }} onClick={() => {
          localStorage.setItem("buyNow", JSON.stringify(cart));
          navigate("/summary");
        }}>Proceed to Checkout</button>
      </div>
    </div>
  );
}