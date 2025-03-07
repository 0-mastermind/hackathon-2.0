import React, { useState } from "react";
import "./Connect.css";
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from "../../../../store/features/connect/connect.slice";

const Connect = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  // const connectData = () => {}
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

  const handleFollow = () => {
    const userId = JSON.parse(localStorage("AUTH_DATA")).userID;
    dispatch(connectUser({userId, }));
  };

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
            <p className="user-skills">{user.skills.join(" • ")}</p>
            <div className="button-group">
              <button className="profile-button">View Profile</button>
              <button className="follow-button" onClick={() => handleFollow()}>
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect;
