import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faReply } from "@fortawesome/free-solid-svg-icons";
import "./Post.css"; // Import the CSS file

const Post = () => {
  // Sample post data
  const postsData = [
    {
      id: 1,
      title: "Beautiful Sunset",
      description: "A breathtaking view of the sunset over the horizon.",
      image: "https://via.placeholder.com/400x200",
      likes: 120,
      replies: 45,
      profilePic: "https://via.placeholder.com/40",
      name: "John Doe",
    },
    {
      id: 2,
      title: "Mountain Adventure",
      description: "Exploring the majestic mountains and their beauty.",
      image: "https://via.placeholder.com/400x200",
      likes: 95,
      replies: 30,
      profilePic: "https://via.placeholder.com/40",
      name: "Jane Smith",
    },
    {
      id: 3,
      title: "City Lights",
      description: "The vibrant nightlife of the city never disappoints.",
      image: "https://via.placeholder.com/400x200",
      likes: 150,
      replies: 60,
      profilePic: "https://via.placeholder.com/40",
      name: "Alice Johnson",
    },
  ];

  return (
    <div className="post-container">
      <h1 className="post-heading">Recent Posts</h1>

      {/* Post List */}
      <div className="post-list">
        {postsData.map((post) => (
          <div key={post.id} className="post-card">
            {/* Profile Section */}
            <div className="profile-section">
              <img
                src={post.profilePic}
                alt={post.name}
                className="profile-pic"
              />
              <span className="profile-name">{post.name}</span>
            </div>

            {/* Title */}
            <h2 className="post-title">{post.title}</h2>

            {/* Description */}
            <p className="post-description">{post.description}</p>

            {/* Image Div */}
            <div
              className="post-image"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>

            {/* Like and Reply Icons */}
            <div className="post-actions">
              <div className="like-action">
                <FontAwesomeIcon icon={faHeart} className="like-icon" />
                <span className="like-count">{post.likes}</span>
              </div>
              <div className="reply-action">
                <FontAwesomeIcon icon={faReply} className="reply-icon" />
                <span className="reply-count">{post.replies}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;