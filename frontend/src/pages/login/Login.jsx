import React from "react";
import "./Login.css";

const Login = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
    // Add login logic here
  };

  return (
    <div className="login-page">
      <a href="/" className="back-btn">
        <i className="fas fa-arrow-left"></i>
        Back
      </a>

      <div className="login-container">
        <div className="login-header">
          <i className="fas fa-user-circle"></i>
          <h1>Welcome Back</h1>
          <p>Please enter your details</p>
        </div>

        <div className="form-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            className="form-input"
            placeholder="Email address"
          />
        </div>

        <div className="form-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            className="form-input"
            placeholder="Password"
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          <i className="fas fa-sign-in-alt"></i>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
