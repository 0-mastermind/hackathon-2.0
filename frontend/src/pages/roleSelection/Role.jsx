import React from 'react';
import './RoleSelection.css'; 

const RoleSelection = () => {
  return (
    <div className="container">
      <h1 className="title">Who You Are?</h1>

      <div className="cards-wrapper">
        {/* Student Card */}
        <div className="role-card" onClick={() => window.location.href = 'student-login.html'}>
          <div className="icon-wrapper">
            <i className="fas fa-user-graduate icon"></i>
          </div>
          <h2 className="role-title">Student</h2>
          <p className="role-description">
            Access your learning resources, connect with peers, and track your educational progress.
          </p>
          <a href="student-login.html" className="select-btn">
            Continue as Student
          </a>
        </div>

        {/* Alumni Card */}
        <div className="role-card" onClick={() => window.location.href = 'alumni-login.html'}>
          <div className="icon-wrapper">
            <i className="fas fa-award icon"></i>
          </div>
          <h2 className="role-title">Alumni</h2>
          <p className="role-description">
            Stay connected with your alma mater, mentor students, and share your valuable experience.
          </p>
          <a href="alumni-login.html" className="select-btn">
            Continue as Alumni
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;