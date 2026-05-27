import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSignup = () => {
    if (!email || !password) return showAlert("All fields are required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showAlert("Enter valid email format");
    if (!/^[A-Za-z0-9]*[0-9]+[A-Za-z0-9]*$/.test(password)) return showAlert("Password must contain letters and numbers");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) return showAlert("User already exists");

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    
    // Notice how we pass navigate as a callback to run AFTER they click OK
    showAlert("Account created successfully", () => navigate("/login"));
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
      <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder="Create Password" />
      <div className="show-pass">
        <input type="checkbox" onChange={() => setShowPass(!showPass)} />
        <label>Show Password</label>
      </div>
      <button className="btn-primary" style={{ width: '100%' }} onClick={handleSignup}>Sign Up</button>
      <p>Already a user? <Link to="/login">Login</Link></p>
    </div>
  );
}