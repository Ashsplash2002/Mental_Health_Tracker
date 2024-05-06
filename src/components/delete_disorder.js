import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function DeleteDisorder() {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/disorder/delete/${id}`);
      setSuccessMessage('Disorder deleted successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error deleting disorder. Please try again later.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ marginTop: "200px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ marginTop: "150px" }}>
            <div className="card-body" >
              <h3 className="card-title mb-4">Delete Disorder</h3>
              <p>Are you sure you want to delete this disorder?</p>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
              {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
              {successMessage && <Link to="/intensity" className="mt-3">Go back to Intensity</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDisorder;
