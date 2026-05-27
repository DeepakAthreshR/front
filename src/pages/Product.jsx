import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useAlert } from "../context/AlertContext";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [qty, setQty] = useState(1);
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <h2 className="page-title">Product Not Found</h2>;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: parseInt(qty) });
    localStorage.setItem("cart", JSON.stringify(cart));
    showAlert("Item added to cart!");
  };

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => navigate("/")}>ShopFlow</h1>
        <button className="btn-outline" onClick={() => navigate("/cart")}>🛒 Cart</button>
      </nav>

      <div className="product-single">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p className="desc">{product.description}</p>
        <p className="price">${product.price}</p>
        
        <div className="product-actions">
          <input type="number" value={qty} onChange={e => setQty(e.target.value)} min="1" style={{width: "80px", margin: 0}} />
          <button className="btn-outline" onClick={addToCart}>Add to Cart</button>
          <button className="btn-primary" onClick={() => {
            localStorage.setItem("buyNow", JSON.stringify([{ ...product, qty: parseInt(qty) }]));
            navigate("/summary");
          }}>Buy Now</button>
        </div>
        <button className="btn-secondary" style={{marginTop: '20px', width: '100%'}} onClick={() => navigate("/")}>Back to Store</button>
      </div>
    </div>
  );
}