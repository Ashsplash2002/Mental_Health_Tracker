import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "./slider";
import { useUser } from "../UserContext";
import { Link } from 'react-router-dom';

function Intensity() {
  const [disorders, setDisorders] = useState([]);
  const { userEmail } = useUser();

  useEffect(() => {
    const fetchDisorders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/disorder/get-disorders?email=${userEmail}`);
        setDisorders(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDisorders();
  }, [userEmail]);

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4" style={{ border: "1px solid light grey", marginTop: "50px" }}>
            <h3 className="card-title mb-4">Add your daily log</h3>
            {disorders.map((disorder) => (
              <div key={disorder._id}>
                <div style={{ marginBottom: "10px" }}>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "5px" }}>{disorder.name}</h3>
                  <div>
                    <Link to={`/update/${disorder._id}`} style={{ marginRight: "10px" }}>Update</Link>
                    <Link to={`/delete/${disorder._id}`}>Delete</Link>
                  </div>
                </div>
                <p>Date Diagnosed: {new Date(disorder.dateDiagnosed).toLocaleDateString()}</p>
                <Slider disorderId={disorder._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intensity;
