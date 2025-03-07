import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserAccount, setUserDetails } from "../../store/features/auth/signup.slice";
import "./Sign.css";

const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.signup);

  // Redirect to role selection page if accountType is not set
  useEffect(() => {
    if (!signupData.accountType) {
      navigate("/role");
    }
  }, [signupData.accountType, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract user details from the state
    const { name, email, password, confirmPassword, accountType } = signupData;

    // Dispatch the signup action with user details
    dispatch(createUserAccount({ name, email, password, confirmPassword, accountType }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserDetails({ name, value }));
  };

  // Redirect to login page after successful signup with a 2-second delay
  useEffect(() => {
    if (signupData.success) {
      // Display success toast
      toast.success("Verification email sent! Redirecting to login...", {
        position: "top-center", // Toast appears at the top-center of the screen
        autoClose: 2000, // Close the toast after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Position the toast in the middle-top of the screen
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Sign;