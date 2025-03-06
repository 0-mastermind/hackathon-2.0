import React, { useState } from 'react';
import './Events.css'; // Import the CSS file

const Events = () => {
  // Sample event data
  const eventsData = [
    {
      id: 1,
      title: 'Tech Conference 2023',
      image: 'https://via.placeholder.com/300x200',
      category: 'Technology',
      date: 'October 25, 2023',
    },
    {
      id: 2,
      title: 'Art Exhibition',
      image: 'https://via.placeholder.com/300x200',
      category: 'Art',
      date: 'November 10, 2023',
    },
    {
      id: 3,
      title: 'Music Festival',
      image: 'https://via.placeholder.com/300x200',
      category: 'Music',
      date: 'December 15, 2023',
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on search query
  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <button className="register-btn">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;