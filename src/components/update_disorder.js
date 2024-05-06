import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateDisorder() {
  const [name, setName] = useState('');
  const [dateDiagnosed, setDateDiagnosed] = useState('');
  const { id } = useParams();

  useEffect(() => {
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

    fetchDisorder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/disorder/${id}`, {
        name,
        dateDiagnosed,
      });
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Disorder</h2>
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
    </div>
  );
}

export default UpdateDisorder;
