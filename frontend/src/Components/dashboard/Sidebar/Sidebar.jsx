import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faBriefcase,
  faCalendarAlt,
  faNewspaper,
  faComments,
  faPlusCircle,
  faUserCircle,
  faClipboardList,
  faEdit,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <div>
          {/* Add a logo or heading here if needed */}
        </div>
        <ul className="nav-list">
          <li>
            <NavLink
              to="/dashboard/connect"
              className="nav-link"
              title="Connect"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faUserFriends} className="icon" />
              <span className="nav-text">Connect</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/job"
              className="nav-link"
              title="Job"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faBriefcase} className="icon" />
              <span className="nav-text">Job</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/events"
              className="nav-link"
              title="Events"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <span className="nav-text">Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/posts"
              className="nav-link"
              title="Posts"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faNewspaper} className="icon" />
              <span className="nav-text">Posts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/discussion"
              className="nav-link"
              title="Discussion"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faComments} className="icon" />
              <span className="nav-text">Discussion</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/post-job"
              className="nav-link"
              title="Post Job"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faPlusCircle} className="icon" />
              <span className="nav-text">Post Job</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-profile"
              className="nav-link"
              title="My Profile"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              <span className="nav-text">My Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/see-applications"
              className="nav-link"
              title="See Applications"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faClipboardList} className="icon" />
              <span className="nav-text">See Applications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/create-post"
              className="nav-link"
              title="Create Post"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faEdit} className="icon" />
              <span className="nav-text">Create Post</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/create-event"
              className="nav-link"
              title="Create Event"
              activeclassname="active"
            >
              <FontAwesomeIcon icon={faCalendarPlus} className="icon" />
              <span className="nav-text">Create Event</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;