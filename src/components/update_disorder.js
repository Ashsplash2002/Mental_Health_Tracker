import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateDisorder() {
  const [name, setName] = useState('');
  const [dateDiagnosed, setDateDiagnosed] = useState('');
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDisorder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/disorder/${id}`);
      const { name, dateDiagnosed } = response.data;
      setName(name);
      setDateDiagnosed(dateDiagnosed);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDisorder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/disorder/update/${id}`, {
        name,
        dateDiagnosed,
      });
      setSuccessMessage('Disorder updated successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error updating disorder. Please try again later.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ marginTop: "150px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ marginTop: "150px" }}>
            <div className="card-body">
              <h2 className="card-title mb-4">Update Disorder</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="dateDiagnosed" className="form-label">Date Diagnosed:</label>
                  <input type="date" className="form-control" id="dateDiagnosed" value={dateDiagnosed} onChange={(e) => setDateDiagnosed(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Disorder</button>
              </form>
              {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
              {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDisorder;
