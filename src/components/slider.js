import React, { useState } from "react";
import axios from "axios";

function Slider({ disorderId }) {
  const [intensity, setIntensity] = useState(5); // Default intensity value
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

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
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={intensity}
        onChange={(e) => setIntensity(parseInt(e.target.value))}
      />
      {/* Add marginLeft of 60px to move the button to the right */}
      <button onClick={handleIntensityChange} style={{ marginLeft: "30px" }}>Save Intensity</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default Slider;
