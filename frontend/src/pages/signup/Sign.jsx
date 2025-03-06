import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserAccount, setUserDetails } from "../../store/features/auth/signup.slice";
import "./Sign.css";

const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const signupData = useSelector((state) => state.signup); // Access the signup state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract user details from the state
    const { name, email, password, confirmPassword } = signupData;

    // Dispatch the signup action with user details
    dispatch(createUserAccount({ name, email, password, confirmPassword }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserDetails({ name, value })); // Update the state
  };

  // Redirect to login page after successful signup
  React.useEffect(() => {
    if (signupData.success) {
      navigate("/login"); // Redirect to login page on successful signup
    }
  }, [signupData.success, navigate]);

  return (
    <div className="signup-page">
      <a href="/" className="back-btn">
        <i className="fas fa-arrow-left"></i> Back
      </a>

      <div className="signup-container">
        <div className="signup-header">
          <i className="fas fa-user-circle"></i>
          <h1>Sign Up</h1>
          <p>Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name"
              value={signupData.name} // Controlled input
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              value={signupData.email} // Controlled input
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={signupData.password} // Controlled input
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm Password"
              value={signupData.confirmPassword} // Controlled input
              onChange={handleChange}
              required
            />
          </div>

          {/* Display error message */}
          {signupData.error && <p className="error-message">{signupData.error}</p>}

          {/* Display success message */}
          {signupData.success && <p className="success-message">{signupData.success}</p>}

          <div className="signup-button-container">
            <a href="/login">Already have account? Login </a>
            <button type="submit" className="signup-btn" disabled={signupData.loading}>
              {signupData.loading ? (
                <i className="fas fa-spinner fa-spin"></i> // Loading spinner
              ) : (
                <>
                  <i className="fas fa-user-plus"></i> Sign Up
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;