import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/book-appointment", { state: { doctor } });
  };

  // Get initials for avatar circle
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="doctor-card">
      <div>
        <div className="doctor-avatar-circle">{initials}</div>
        <h3 className="doctor-name">{doctor.name}</h3>
        <span className="specialization-tag">{doctor.specialization}</span>

        <div className="doctor-info-list">
          <p><strong>Hospital:</strong> {doctor.hospital}</p>
          <p><strong>Experience:</strong> {doctor.experience}</p>
          <p><strong>Available Time:</strong> {doctor.availableTime}</p>
        </div>
      </div>

      <button onClick={handleBookClick} className="btn btn-primary">
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorCard;
