import React, { useEffect, useState } from "react";
import "./Connect.css";
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from "../../../../store/features/connect/connect.slice";
import { getAllUser } from "../../../../store/features/user/getAll.slice";

const Connect = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getAllUsers);
  const followUser = useSelector((state) => state.followUser);
  const [users, setUsers] = useState([]);

  // Get the current user's ID from localStorage
  const currentUserId = JSON.parse(localStorage.getItem("AUTH_DATA"))?.userID;

  // Fetch all users on component mount
  useEffect(() => {
    if (currentUserId) {
      dispatch(getAllUser({ userId: currentUserId }));
    }
  }, [dispatch, currentUserId]);

  // Update the users state when userData is successfully fetched
  useEffect(() => {
    if (userData.success && userData.events?.users) {
      setUsers(userData.events.users);
    }
  }, [userData.success, userData.events?.users]);

  // Handle follow/unfollow action
  const handleFollow = (targetId) => {
    if (currentUserId) {
      dispatch(connectUser({ userId: currentUserId, targetId }));
    }
  };

  // Refresh user data after a successful follow/unfollow action
  useEffect(() => {
    if (followUser.success && currentUserId) {
      dispatch(getAllUser({ userId: currentUserId }));
    }
  }, [followUser.success, dispatch, currentUserId]);

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
        {filteredUsers.map((user) => {
          // Ensure `connectedUser` exists before checking
          const isFollowing = user.connectedUser?.some(
            (connectedUser) => connectedUser?._id === currentUserId
          );

          return (
            <div key={user._id} className="user-card">
              <img src={user.image} alt={user.name} className="user-avatar" />
              <h3 className="user-name">{user.name}</h3>
              <p className="user-skills">{user.skills.join(" • ")}</p>
              <div className="button-group">
                <button className="profile-button">View Profile</button>
                <button
                  className={`follow-button ${isFollowing ? "following" : ""}`}
                  onClick={() => handleFollow(user._id)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connect;
