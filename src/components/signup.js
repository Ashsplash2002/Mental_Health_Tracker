import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/signup", { email, password })
      .then(result => {
        setMessage(result.data);
      })
      .catch(error => {
        console.error("Error:", error);
        if (error.response && error.response.status === 400 && error.response.data === 'User already exists') {
          setMessage('User already exists');
        } else {
          setMessage("Failed to sign up. Please try again.");
        }
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
              {message && <p className={`mt-3 ${message === 'User signed up successfully!' ? 'text-success' : 'text-danger'}`}>{message}</p>}
              {message === 'User signed up successfully!' && <p>Already have an account? <Link to="/">Go to Login</Link></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
