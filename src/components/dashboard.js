import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

function Dashboard() {
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

  // Function to calculate average intensity for the past week
  const calculateWeeksAverageIntensity = (intensityLogs) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const relevantLogs = intensityLogs.filter(log => new Date(log.date) >= oneWeekAgo);
    const totalIntensity = relevantLogs.reduce((sum, log) => sum + log.intensity, 0);
    const averageIntensity = relevantLogs.length > 0 ? totalIntensity / relevantLogs.length : 0;

    return Math.round(averageIntensity); // Round the average intensity to an integer
  };

  // Function to calculate average intensity for the past month
  const calculateMonthsAverageIntensity = (intensityLogs) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const relevantLogs = intensityLogs.filter(log => new Date(log.date) >= oneMonthAgo);
    const totalIntensity = relevantLogs.reduce((sum, log) => sum + log.intensity, 0);
    const averageIntensity = relevantLogs.length > 0 ? totalIntensity / relevantLogs.length : 0;

    return Math.round(averageIntensity); // Round the average intensity to an integer
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="col-md-8">
          <div className="card" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <div className="card-body">
              <h2 className="card-title mb-4">Dashboard</h2>
              {disorders.map(disorder => (
                <div key={disorder._id}>
                  <h3>{disorder.name}</h3>
                  <p>Date Diagnosed: {new Date(disorder.dateDiagnosed).toLocaleDateString()}</p>
                  <p>Week's Average Intensity: {calculateWeeksAverageIntensity(disorder.intensityLogs)}</p>
                  <p>Month's Average Intensity: {calculateMonthsAverageIntensity(disorder.intensityLogs)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
