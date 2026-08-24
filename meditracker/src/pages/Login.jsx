import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setCurrentUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Invalid email or password.");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const user = registeredUsers.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (setCurrentUser) {
        setCurrentUser(user);
      }
      navigate("/doctors");
    } else {
      // Fallback demo user if testing before registration
      if (registeredUsers.length === 0) {
        const demoUser = {
          name: formData.email.split("@")[0] || "Patient",
          email: formData.email,
          password: formData.password
        };
        localStorage.setItem("currentUser", JSON.stringify(demoUser));
        if (setCurrentUser) {
          setCurrentUser(demoUser);
        }
        navigate("/doctors");
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <p className="subtitle">Welcome back! Please enter your credentials.</p>

      {error && <div className="auth-error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
          Login
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
