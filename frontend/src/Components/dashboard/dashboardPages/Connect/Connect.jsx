import React, { useState } from "react";
import "./Connect.css";

const Connect = () => {
  const [search, setSearch] = useState("");

  // Sample user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/80",
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/80",
      skills: ["Node.js", "MongoDB", "Express"],
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://via.placeholder.com/80",
      skills: ["Python", "Django", "Machine Learning"],
    },
  ];

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="connect-container">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* User Cards */}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <h3 className="user-name">{user.name}</h3>
            <p className="user-skills">
              {user.skills.join(" • ")}
            </p>
            <div className="button-group">
              <button className="profile-button">View Profile</button>
              <button className="follow-button">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect;
