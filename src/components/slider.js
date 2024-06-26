import React, { useState } from "react";
import axios from "axios";

function Slider({ disorderId }) {
  const [intensity, setIntensity] = useState(5); // Default intensity value
  const [successMessage, setSuccessMessage] = useState("");

  const handleIntensityChange = async () => {
    try {
      // Send intensity data to backend for updating intensity log
      const response = await axios.post("http://localhost:5000/disorder/add-intensity-log", {
        disorderId,
        intensity,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", width: "300px" }}>
        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={{ marginLeft: "10px", fontSize: "16px" }}>{intensity}</div> {/* Adjusted font size to 16px */}
      </div>
      <button onClick={handleIntensityChange} style={{ marginTop: "10px", marginBottom:"10px" }}>Save Intensity</button>
      {successMessage && <p style={{ color: "green", marginTop: "10px" ,marginBottom:"50px" }}>{successMessage} </p>}
    </div>
  );
}

export default Slider;
