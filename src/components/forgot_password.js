import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/forgot-password", { email, newPassword })
      .then(result => {
        setMessage(result.data.message);
        if (result.data.success) {
          navigate("/"); // Redirect to login page upon successful password reset
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setMessage("Failed to reset password. Please try again.");
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Forgot Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
              </form>
              {message && <p className={`mt-3 ${message === 'Password reset successfully' ? 'text-success' : 'text-danger'}`}>{message}</p>}
              {message === 'Password reset successfully' && <p><Link to="/">Go to Login</Link></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
