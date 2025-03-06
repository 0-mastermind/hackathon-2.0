import React from 'react';
import './RoleSelection.css'; 

const RoleSelection = () => {
  // Function to handle card click
  const handleCardClick = () => {
    window.location.href = '/signup'; // Redirect to the signup page
  };

  return (
    <div className="role-selection-container">
      <h1 className="title">Who You Are?</h1>

      <div className="cards-wrapper">
        {/* Student Card */}
        <div className="role-card" onClick={handleCardClick}>
          <div className="icon-wrapper">
            <i className="fas fa-user-graduate icon"></i>
          </div>
          <h2 className="role-title">Student</h2>
          <p className="role-description">
            Access your learning resources, connect with peers, and track your educational progress.
          </p>
          <a href="/signup" className="select-btn">
            Continue as Student
          </a>
        </div>

        {/* Alumni Card */}
        <div className="role-card" onClick={handleCardClick}>
          <div className="icon-wrapper">
            <i className="fas fa-award icon"></i>
          </div>
          <h2 className="role-title">Alumni</h2>
          <p className="role-description">
            Stay connected with your alma mater, mentor students, and share your valuable experience.
          </p>
          <a href="/signup" className="select-btn">
            Continue as Alumni
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;