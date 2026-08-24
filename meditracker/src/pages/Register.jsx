import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register({ setCurrentUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const userExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Log the user in
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    if (setCurrentUser) {
      setCurrentUser(newUser);
    }

    navigate("/doctors");
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <p className="subtitle">Create an account to book your appointment.</p>

      {error && <div className="auth-error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
          Register
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
