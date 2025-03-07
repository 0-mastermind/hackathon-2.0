import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Connect.css";
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from "../../../../store/features/connect/connect.slice";
import { getAllUser } from "../../../../store/features/user/getAll.slice";

const Connect = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getAllUsers);
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

  // Handle follow button click
  const handleFollow = (targetName) => {
    // Display toast when the follow button is clicked
    toast.success(`You followed ${targetName}!`, {
      position: "top-center", // Toast appears at the top-center of the screen
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
          return (
            <div key={user._id} className="user-card">
              <img src={user.image} alt={user.name} className="user-avatar" />
              <h3 className="user-name">{user.name}</h3>
              <p className="user-skills">{user.skills.join(" • ")}</p>
              <div className="button-group">
                <button className="profile-button">View Profile</button>
                <button
                  className="follow-button"
                  onClick={() => handleFollow(user.name)}
                >
                  Follow
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Position the toast in the middle-top of the screen
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Connect;