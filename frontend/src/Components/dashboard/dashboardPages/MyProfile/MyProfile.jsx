import React from "react";
import "./MyProfile.css"; // Import the CSS file

const MyProfile = () => {
  const user = {
    name: "John Doe",
    profile: "Alumni",
    college: "Harvard University",
    description:
      "Passionate about web development and design. Currently pursuing a degree in Computer Science.",
    skills: ["CSS", "HTML", "C++", "Java"],
    avatar: "https://via.placeholder.com/100", // Placeholder image
  };

  return (
    <div className="profile-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="avatar-container">
          <img src={user.avatar} alt="User Avatar" className="avatar" />
        </div>
        <div className="profile-info">
          <h1 className="name">{user.name}</h1>
          <p className="college">{user.college}</p>
          <p className="profile-type">{user.profile}</p>
        </div>
        <button className="connect-button">Connect</button>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <p>{user.description}</p>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2>Skills</h2>
        <div className="skills-list">
          {user.skills.map((skill, index) => (
            <div key={index} className="skill-box">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
