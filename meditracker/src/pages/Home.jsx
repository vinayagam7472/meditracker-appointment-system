import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-card">
        <h1 className="hero-heading">Book Your Doctor Appointment Easily</h1>
        <p className="hero-description">
          Find a doctor and book your appointment online in just a few simple steps.
        </p>
        <button onClick={() => navigate("/doctors")} className="btn btn-primary">
          Find a Doctor
        </button>
      </div>

      {/* Benefits Section */}
      <div>
        <h2 className="benefits-title">Why Choose MediTracker?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Book a doctor appointment online quickly.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">⏱️</div>
            <h3>Save Time</h3>
            <p>Avoid unnecessary waiting at hospitals and clinics.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">👍</div>
            <h3>Convenient</h3>
            <p>Manage your appointments from anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
