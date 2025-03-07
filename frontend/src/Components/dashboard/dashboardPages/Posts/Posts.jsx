import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "./Post.css"; // Import the CSS file
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';

const Post = () => {
  // Sample post data
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      title: "Beautiful Sunset",
      description: "A breathtaking view of the sunset over the horizon.",
      image: img1,
      likes: 120,
      name: "John Doe",
    },
    {
      id: 2,
      title: "Mountain Adventure",
      description: "Exploring the majestic mountains and their beauty.",
      image: img2,
      likes: 95,
      name: "Jane Smith",
    },
    {
      id: 3,
      title: "City Lights",
      description: "The vibrant nightlife of the city never disappoints.",
      image: img3,
      likes: 150,
      name: "Alice Johnson",
    },
  ]);

  // Handle like button click
  const handleLike = (id) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Handle dislike button click
  const handleDislike = (id) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: Math.max(post.likes - 1, 0) } : post
      )
    );
  };

  return (
    <div className="post-container">
      <h1 className="post-heading">Recent Posts</h1>

      {/* Post List */}
      <div className="post-list">
        {postsData.map((post) => (
          <div key={post.id} className="post-card">
            {/* Name */}
            <div className="profile-section">
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

            {/* Like and Dislike Buttons */}
            <div className="post-actions">
              <div className="like-action" onClick={() => handleLike(post.id)}>
                <FontAwesomeIcon icon={faHeart} className="like-icon" />
                <span className="like-count">{post.likes}</span>
              </div>
              <div className="dislike-action" onClick={() => handleDislike(post.id)}>
                <FontAwesomeIcon icon={faThumbsDown} className="dislike-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;