import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    if (setCurrentUser) {
      setCurrentUser(null);
    }
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          MediTracker
        </Link>

        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")}>
            Doctors
          </NavLink>
          <NavLink to="/my-appointments" className={({ isActive }) => (isActive ? "active" : "")}>
            My Appointments
          </NavLink>
        </div>

        <div className="navbar-auth">
          {currentUser ? (
            <>
              <span className="user-welcome">
                Welcome, {currentUser.name}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
