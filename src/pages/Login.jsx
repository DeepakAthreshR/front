import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // Access the global alert

  const handleLogin = () => {
    if (!email || !password) return showAlert("All fields are required");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email && u.password === password)) {
      localStorage.setItem("loggedInUser", email);
      navigate("/");
    } else {
      showAlert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email Address" />
      <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder="Password" />
      <div className="show-pass">
        <input type="checkbox" onChange={() => setShowPass(!showPass)} />
        <label>Show Password</label>
      </div>
      <button className="btn-primary" style={{ width: '100%' }} onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}