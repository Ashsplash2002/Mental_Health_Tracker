import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext"; // Import useUser hook

function AddDisorder() {
  const [name, setName] = useState("");
  const [dateDiagnosed, setDateDiagnosed] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const { userEmail } = useUser(); // Access userEmail from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/disorder/add-disorder", {
        email: userEmail, // Use userEmail from the context
        name,
        dateDiagnosed,
      });
      console.log(response.data);
      // Set success message
      setSuccessMessage("Disorder added successfully!");
      // Reset form fields after successful submission
      setName("");
      setDateDiagnosed("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-4">Add New Disorder</h3>
                {/* Display success message if it exists */}
                {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dateDiagnosed" className="form-label">Date Diagnosed:</label>
                    <input type="date" className="form-control" id="dateDiagnosed" value={dateDiagnosed} onChange={(e) => setDateDiagnosed(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Disorder</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDisorder;
