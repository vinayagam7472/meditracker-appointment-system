import React, { useState } from "react";
import { doctors } from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");

  // Search filter for name and specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialization.toLowerCase().includes(query)
    );
  });

  return (
    <div className="doctors-page">
      <h2 className="page-title">Find a Doctor</h2>
      <p className="page-subtitle">Select a specialist and schedule your appointment easily.</p>

      {/* Doctor Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctor by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Doctor List */}
      {filteredDoctors.length > 0 ? (
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="no-doctors">
          <p>No doctors found.</p>
        </div>
      )}
    </div>
  );
}

export default Doctors;
