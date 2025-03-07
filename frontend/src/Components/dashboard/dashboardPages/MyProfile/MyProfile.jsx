import React from "react";
import "./ViewProfile.css"; // Import the CSS file

const ViewProfile = () => {
  // Static user data (dummy data)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150", // Placeholder image
    bio: "I am a software developer with a passion for building scalable and user-friendly applications.",
    location: "New York, USA",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  };

  return (
    <div className="view-profile-container">
      <h1 className="profile-heading">Your Profile</h1>

      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-picture">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-image"
          />
        </div>

        {/* User Details */}
        <div className="user-info">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <p className="user-bio">{user.bio}</p>
        </div>

        {/* Additional Details (e.g., skills, location) */}
        <div className="additional-details">
          <h3>Additional Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{user.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Skills:</span>
              <span className="detail-value">{user.skills.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;