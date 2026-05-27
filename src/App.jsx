import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Summary from "./pages/Summary";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders"; // 🚀 Import new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} /> {/* 🚀 Add Route */}
    </Routes>
  );
}

export default App;