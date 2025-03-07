import React, { useState } from "react";
import "./CreateEvent.css"; // Import the CSS file

const CreateEvent = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "", // New field for category
    image: null, // To store the uploaded image file
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here (e.g., API call)
  };

  // Event categories
  const categories = ["HACKATHON", "DEBATE", "WEBINAR", "MEETUPS", "WORKSHOPS"];

  return (
    <div className="create-event-container">
      <h1 className="create-event-heading">Create an Event</h1>

      {/* Event Creation Form */}
      <form onSubmit={handleSubmit} className="create-event-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Event Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" // Accept only image files
            onChange={handleImageUpload}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;