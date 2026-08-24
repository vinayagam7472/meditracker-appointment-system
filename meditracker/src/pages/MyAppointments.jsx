import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(saved);
  }, []);

  const handleCancel = (id) => {
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return { ...apt, status: "Cancelled" };
      }
      return apt;
    });

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="appointments-container">
      <h2 className="page-title">My Appointments</h2>
      <p className="page-subtitle">View and manage your booked doctor appointments.</p>

      {appointments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", backgroundColor: "var(--card)", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text)" }}>No appointments booked yet.</p>
          <Link to="/doctors" className="btn btn-primary">
            Book an Appointment
          </Link>
        </div>
      ) : (
        appointments.map((apt) => (
          <div key={apt.id} className="appointment-card">
            <div className="apt-header">
              <div>
                <h3 style={{ color: "var(--heading)", fontSize: "1.15rem" }}>{apt.doctor}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text)" }}>ID: {apt.id}</p>
              </div>
              <span className={`status-tag ${apt.status === "Confirmed" ? "status-confirmed" : "status-cancelled"}`}>
                Status: {apt.status}
              </span>
            </div>

            <div className="apt-body">
              <p><strong>Patient Name:</strong> {apt.patientName}</p>
              <p><strong>Phone:</strong> {apt.phone}</p>
              <p><strong>Date:</strong> {apt.date}</p>
              <p><strong>Time:</strong> {apt.time}</p>
              <p style={{ gridColumn: "1 / -1" }}><strong>Reason:</strong> {apt.reason}</p>
            </div>

            <div className="apt-footer">
              {apt.status === "Confirmed" ? (
                <button onClick={() => handleCancel(apt.id)} className="btn btn-danger">
                  Cancel Appointment
                </button>
              ) : (
                <span style={{ fontSize: "0.85rem", color: "var(--error)", fontStyle: "italic" }}>
                  Appointment Cancelled
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;
