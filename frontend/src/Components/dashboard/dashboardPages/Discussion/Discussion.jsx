import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import "./DiscussionForum.css"; // Import the CSS file

const DiscussionForum = () => {
  // Sample discussion data
  const discussionsData = [
    {
      id: 1,
      title: "Best Practices for React Development",
      description:
        "What are some best practices for writing clean and maintainable React code?",
    },
    {
      id: 2,
      title: "State Management in Large Applications",
      description:
        "How do you manage state in large-scale React applications? Redux, Context API, or something else?",
    },
    {
      id: 3,
      title: "Performance Optimization Tips",
      description:
        "What are some effective ways to optimize the performance of a React app?",
    },
  ];

  // State to manage which discussion's reply dropdown is open
  const [openReplyId, setOpenReplyId] = useState(null);

  // Toggle reply dropdown
  const toggleReplyDropdown = (id) => {
    setOpenReplyId(openReplyId === id ? null : id);
  };

  return (
    <div className="discussion-forum-container">
      <h1 className="discussion-heading">Discussion Forum</h1>

      {/* Discussion List */}
      <div className="discussion-list">
        {discussionsData.map((discussion) => (
          <div key={discussion.id} className="discussion-card">
            {/* Title */}
            <h2 className="discussion-title">{discussion.title}</h2>

            {/* Description */}
            <p className="discussion-description">{discussion.description}</p>

            {/* Reply Icon and Dropdown */}
            <div className="reply-section">
              <button
                className="reply-icon-button"
                onClick={() => toggleReplyDropdown(discussion.id)}
              >
                <FontAwesomeIcon icon={faReply} className="reply-icon" />
                <span>Reply</span>
              </button>

              {/* Reply Dropdown */}
              {openReplyId === discussion.id && (
                <div className="reply-dropdown">
                  <textarea
                    placeholder="Write your reply..."
                    rows="3"
                    className="reply-textarea"
                  ></textarea>
                  <button className="submit-reply-button">Submit</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;