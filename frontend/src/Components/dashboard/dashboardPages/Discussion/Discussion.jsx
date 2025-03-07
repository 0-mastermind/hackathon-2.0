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

  // State to store replies for each discussion
  const [replies, setReplies] = useState({});

  // State to store the current reply text
  const [replyText, setReplyText] = useState("");

  // Toggle reply dropdown
  const toggleReplyDropdown = (id) => {
    setOpenReplyId(openReplyId === id ? null : id);
    setReplyText(""); // Clear the reply text when toggling
  };

  // Handle reply submission
  const handleReplySubmit = (id) => {
    if (replyText.trim() === "") return; // Do not submit empty replies

    // Update the replies state with the new reply
    setReplies((prevReplies) => ({
      ...prevReplies,
      [id]: [...(prevReplies[id] || []), replyText], // Add the new reply to the discussion
    }));

    setReplyText(""); // Clear the reply text after submission
    setOpenReplyId(null); // Close the reply dropdown
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

            {/* Display Replies */}
            {replies[discussion.id] && (
              <div className="replies-section">
                <h4>Replies:</h4>
                {replies[discussion.id].map((reply, index) => (
                  <div key={index} className="reply-item">
                    <p>{reply}</p>
                  </div>
                ))}
              </div>
            )}

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
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button
                    className="submit-reply-button"
                    onClick={() => handleReplySubmit(discussion.id)}
                  >
                    Submit
                  </button>
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