import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("loggedInUser")) navigate("/login");
  }, [navigate]);

  const buyNow = (product) => {
    localStorage.setItem("buyNow", JSON.stringify([{ ...product, qty: 1 }]));
    navigate("/summary");
  };

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>ShopFlow</h1>
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => navigate("/cart")}>🛒 Cart</button>
          <button className="btn-secondary" onClick={() => { localStorage.removeItem("loggedInUser"); navigate("/login"); }}>Logout</button>
        </div>
      </nav>

      {/* 🚀 This is the Hero Banner that makes it look like a real app! */}
      <div className="hero-banner">
        <h2>Welcome to ShopFlow</h2>
        <p>Discover our exclusive collection of electronics and premium cosmetics.</p>
      </div>

      <div className="container">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <div className="card-actions">
              <button className="btn-secondary" onClick={() => navigate(`/product/${item.id}`)}>Details</button>
              <button className="btn-primary" onClick={() => buyNow(item)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}