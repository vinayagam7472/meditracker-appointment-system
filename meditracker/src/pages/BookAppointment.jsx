import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doctors } from "../data/doctors";

function BookAppointment({ currentUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDoctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    patientName: currentUser ? currentUser.name : "",
    email: currentUser ? currentUser.email : "",
    phone: "",
    doctor: selectedDoctor ? selectedDoctor.name : doctors[0].name,
    date: "",
    time: "",
    reason: ""
  });

  const [errors, setErrors] = useState({});
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number must contain 10 digits.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must contain 10 digits.";
    }

    if (!formData.doctor) {
      newErrors.doctor = "Please select a doctor.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time.";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for visit is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Generate appointment ID
    const appointmentId = "APT-" + Math.floor(1000 + Math.random() * 9000);

    const newAppointment = {
      id: appointmentId,
      patientName: formData.patientName,
      email: formData.email,
      phone: formData.phone,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: "Confirmed"
    };

    // Save to LocalStorage
    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = [newAppointment, ...existingAppointments];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    setBookedAppointment(newAppointment);
  };

  if (bookedAppointment) {
    return (
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h2>Appointment Booked Successfully!</h2>
        <p>Your doctor appointment details are given below:</p>

        <div className="confirmation-box">
          <div className="confirmation-item">
            <span>Appointment ID:</span>
            <span>{bookedAppointment.id}</span>
          </div>
          <div className="confirmation-item">
            <span>Patient Name:</span>
            <span>{bookedAppointment.patientName}</span>
          </div>
          <div className="confirmation-item">
            <span>Doctor:</span>
            <span>{bookedAppointment.doctor}</span>
          </div>
          <div className="confirmation-item">
            <span>Date:</span>
            <span>{bookedAppointment.date}</span>
          </div>
          <div className="confirmation-item">
            <span>Time:</span>
            <span>{bookedAppointment.time}</span>
          </div>
          <div className="confirmation-item">
            <span>Reason:</span>
            <span>{bookedAppointment.reason}</span>
          </div>
          <div className="confirmation-item">
            <span>Status:</span>
            <span style={{ color: "var(--success)" }}>{bookedAppointment.status}</span>
          </div>
        </div>

        <button onClick={() => navigate("/my-appointments")} className="btn btn-primary">
          View My Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 style={{ textAlign: "center", marginBottom: "0.4rem", color: "var(--heading)" }}>
        Book Appointment
      </h2>
      <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--text)" }}>
        Enter patient details to complete your booking.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Patient Name */}
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.patientName ? "input-error" : ""}
          />
          {errors.patientName && <p className="error-message">{errors.patientName}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        {/* Doctor */}
        <div className="form-group">
          <label>Doctor</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className={errors.doctor ? "input-error" : ""}
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
          {errors.doctor && <p className="error-message">{errors.doctor}</p>}
        </div>

        {/* Date & Time */}
        <div className="form-row">
          <div className="form-group">
            <label>Appointment Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? "input-error" : ""}
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label>Appointment Time</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={errors.time ? "input-error" : ""}
            >
              <option value="">Select Time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
            {errors.time && <p className="error-message">{errors.time}</p>}
          </div>
        </div>

        {/* Reason for Visit */}
        <div className="form-group">
          <label>Reason for Visit</label>
          <textarea
            name="reason"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Brief reason for consultation..."
            className={errors.reason ? "input-error" : ""}
          ></textarea>
          {errors.reason && <p className="error-message">{errors.reason}</p>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
