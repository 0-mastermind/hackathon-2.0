import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./RoleSelection.css";
import { useDispatch } from "react-redux";
import { setType } from "../../store/features/auth/signup.slice";

const RoleSelection = () => {
  const dispatch = useDispatch();

  // Function to set account type and navigate
  const setAccountType = (type) => {
    dispatch(setType(type)); // Dispatch the account type to Redux
  };

  return (
    <div className="role-selection-container">
      <h1 className="title">Who You Are?</h1>

      <div className="cards-wrapper">
        {/* Student Card */}
        <div className="role-card">
          <div className="icon-wrapper">
            <i className="fas fa-user-graduate icon"></i>
          </div>
          <h2 className="role-title">Student</h2>
          <p className="role-description">
            Access your learning resources, connect with peers, and track your
            educational progress.
          </p>
          <Link
            to="/signup"
            onClick={() => setAccountType("STUDENT")} // Set account type to STUDENT
            className="select-btn"
          >
            Continue as Student
          </Link>
        </div>

        {/* Alumni Card */}
        <div className="role-card">
          <div className="icon-wrapper">
            <i className="fas fa-award icon"></i>
          </div>
          <h2 className="role-title">Alumni</h2>
          <p className="role-description">
            Stay connected with your alma mater, mentor students, and share your
            valuable experience.
          </p>
          <Link
            to="/signup"
            onClick={() => setAccountType("ALUMNI")} // Set account type to ALUMNI
            className="select-btn"
          >
            Continue as Alumni
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;