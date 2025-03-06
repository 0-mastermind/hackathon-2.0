import React from "react";
import "./Sign.css";

const Sign = () => {
  const handleSignup = () => {
    console.log("Sign-Up button clicked");
    // Add signup logic here
  };

  return (
    <div className="signup-page">
      <a href="/" className="back-btn">
        <i className="fas fa-arrow-left"></i>
        {" "} Back
      </a>

      <div className="signup-container">
        <div className="signup-header">
          <i className="fas fa-user-circle"></i>
          <h1>Sign Up</h1>
          <p>Please enter your details</p>
        </div>

        <div className="form-group">
          <i className="fas fa-user"></i>
          <input type="text" className="form-input" placeholder="Name" />
        </div>

        <div className="form-group">
          <i className="fas fa-envelope"></i>
          <input type="email" className="form-input" placeholder="Email address" />
        </div>

        <div className="form-group">
          <i className="fas fa-lock"></i>
          <input type="password" className="form-input" placeholder="Password" />
        </div>

        <button className="signup-btn" onClick={handleSignup}>
          <i className="fas fa-user-plus"></i>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Sign;
