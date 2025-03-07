import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserAccount, setUserDetails } from "../../store/features/auth/signup.slice";
import "./Sign.css";

const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.signup);
  
  useEffect(() => {
    if (!signupData.accountType) {
      navigate("/role");
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract user details from the state
    const { name, email, password, confirmPassword, accountType } = signupData;

    // Dispatch the signup action with user details
    dispatch(createUserAccount({ name, email, password, confirmPassword, accountType }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserDetails({ name, value }));
  };

  // Redirect to login page after successful signup
  React.useEffect(() => {
    if (signupData.success) {
      navigate("/login");
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
            {/* <i className="fas fa-user"></i> */}
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name"
              value={signupData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {/* <i className="fas fa-envelope"></i> */}
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {/* <i className="fas fa-lock"></i> */}
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={signupData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {/* <i className="fas fa-lock"></i> */}
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Display error message */}
          {signupData.error && <p className="error-message">{signupData.error}</p>}

          {/* Display success message */}
          {signupData.success && <p className="success-message">{signupData.success}</p>}

          <div className="signup-button-container">
            <a href="/login">Already have an account? Login</a>
            <button type="submit" className="signup-btn" disabled={signupData.loading}>
              {signupData.loading ? (
                <i className="fas fa-spinner fa-spin"></i>
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