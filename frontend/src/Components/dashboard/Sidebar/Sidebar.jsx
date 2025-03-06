import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <div>
        
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="/dashboard/connect" className="nav-link">
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/job" className="nav-link">
              Job
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/events" className="nav-link">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/posts" className="nav-link">
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/discussion" className="nav-link">
              Discussion
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/post-job" className="nav-link">
              Post Job
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-profile" className="nav-link">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/see-applications" className="nav-link">
              See Applications
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
