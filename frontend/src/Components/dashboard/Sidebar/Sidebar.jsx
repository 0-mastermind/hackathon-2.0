import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink to="/connect" className="nav-link">
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink to="/job" className="nav-link">
              Job
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className="nav-link">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts" className="nav-link">
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink to="/discussion" className="nav-link">
              Discussion
            </NavLink>
          </li>
          <li>
            <NavLink to="/post-job" className="nav-link">
              Post Job
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-profile" className="nav-link">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/see-applications" className="nav-link">
              See Applications
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
