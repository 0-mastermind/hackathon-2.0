import React, { useState } from "react";
import "./CreatePost.css"; // Import the CSS file

const CreatePost = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading">Create a Post</h1>

      {/* Post Creation Form */}
      <form onSubmit={handleSubmit} className="create-post-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Post Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter post description"
            rows="5"
            required
          ></textarea>
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
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;