import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUserEmail } = useUser(); // Access setUserEmail from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      setUserEmail(email); // Update the email in the context
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      showAlertAndResetFields();
    }
  };

  const showAlertAndResetFields = () => {
    alert("Incorrect email or password. Please try again or register for a new account.");
    resetFields();
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded p-4">
        <section className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt=""/>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="text" id="email" className="form-control form-control-lg" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                  <input type="password" id="password" className="form-control form-control-lg" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-body">Forgot password?</Link>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup" className="link-danger">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
