import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PostJob.css"; // Import the CSS file

const PostJob = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    jobType: "Internship", // Default to Internship
    skillsRequired: "",
    companyName: "",
    qualificationRequired: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Display success toast
    toast.success("Job posted successfully!", {
      position: "top-center", // Toast appears at the top-center of the screen
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Reset form fields after submission
    setFormData({
      title: "",
      description: "",
      jobType: "Internship",
      skillsRequired: "",
      companyName: "",
      qualificationRequired: "",
    });
  };

  return (
    <div className="post-job-container">
      <h1 className="post-job-heading">Post a Job</h1>

      {/* Job Posting Form */}
      <form onSubmit={handleSubmit} className="post-job-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter job description"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Job Type (Internship/Job) */}
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            required
          >
            <option value="Internship">Internship</option>
            <option value="Job">Job</option>
          </select>
        </div>

        {/* Skills Required */}
        <div className="form-group">
          <label htmlFor="skillsRequired">Skills Required</label>
          <input
            type="text"
            id="skillsRequired"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleInputChange}
            placeholder="Enter skills required (comma separated)"
            required
          />
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Qualification Required */}
        <div className="form-group">
          <label htmlFor="qualificationRequired">Qualification Required</label>
          <input
            type="text"
            id="qualificationRequired"
            name="qualificationRequired"
            value={formData.qualificationRequired}
            onChange={handleInputChange}
            placeholder="Enter qualification required"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Post Job
        </button>
      </form>

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

export default PostJob;