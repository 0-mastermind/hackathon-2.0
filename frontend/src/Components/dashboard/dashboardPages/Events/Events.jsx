import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Events.css"; // Import the CSS file
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";

const Events = () => {
  // Sample event data
  const eventsData = [
    {
      id: 1,
      title: "Tech Conference 2023",
      image: img1,
      category: "Technology",
      date: "October 25, 2023",
    },
    {
      id: 2,
      title: "Art Exhibition",
      image: img3,
      category: "Art",
      date: "November 10, 2023",
    },
    {
      id: 3,
      title: "Music Festival",
      image: img2,
      category: "Music",
      date: "December 15, 2023",
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on search query
  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Register Button Click
  const handleRegister = (eventTitle) => {
    toast.success(`Registered for ${eventTitle}!`, {
      position: "top-center", // Toast appears at the top-center of the screen
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="events-container">
      <h1 className="events-heading">Upcoming Events</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      {/* Event List */}
      <div className="events-list">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            {/* Div for image */}
            <div
              className="event-image"
              style={{ backgroundImage: `url(${event.image})` }}
            ></div>
            <div className="event-details">
              <span className="event-category">{event.category}</span>
              <span className="event-date">{event.date}</span>
            </div>
            <button
              className="register-btn"
              onClick={() => handleRegister(event.title)}
            >
              Register
            </button>
          </div>
        ))}
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

export default Events;