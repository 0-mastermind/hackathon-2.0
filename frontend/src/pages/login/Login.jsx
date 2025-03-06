import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginAccount, setLoginDetails } from "../../store/features/auth/login.slice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const loginData = useSelector((state) => state.loginAccount); // Access the login state

  // Check if AUTH_DATA exists in localStorage on component mount
  useEffect(() => {
    const authData = localStorage.getItem("AUTH_DATA");
    if (authData) {
      navigate("/dashboard"); // Redirect to dashboard if AUTH_DATA exists
    }
  }, [navigate]);

  // Redirect to dashboard after successful login
  useEffect(() => {
    if (loginData.success) {
      navigate("/dashboard"); // Redirect to dashboard on successful login
    }
  }, [loginData.success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract email and password from the state
    const { email, password } = loginData;

    // Dispatch the login action with email and password
    dispatch(loginAccount({ email, password }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginDetails({ name, value })); // Update the state
  };

  return (
    <div className="login-page">
      <a href="/" className="back-btn">
        <i className="fas fa-arrow-left"></i> Back
      </a>

      <div className="login-container">
        <div className="login-header">
          <i className="fas fa-user-circle"></i>
          <h1>Welcome Back</h1>
          <p>Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              value={loginData.email} // Controlled input
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
              value={loginData.password} // Controlled input
              onChange={handleChange}
              required
            />
          </div>

          {/* Display error message */}
          {loginData.error && <p className="error-message">{loginData.error}</p>}

          <div className="login-button-container">
            <a href="/signup">Don't Have Account? Create </a>
            <button type="submit" className="login-btn" disabled={loginData.loading}>
              {loginData.loading ? (
                <i className="fas fa-spinner fa-spin"></i> // Loading spinner
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Login
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;