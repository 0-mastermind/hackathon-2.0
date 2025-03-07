import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Job.css"; // Import the CSS file

const Job = () => {
  // Sample job data
  const jobsData = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      company: "Tech Corp",
      location: "Remote",
      salary: "$80,000 - $100,000",
    },
    {
      id: 2,
      title: "Backend Developer",
      type: "Internship",
      company: "Code Masters",
      location: "New York, NY",
      salary: "$50,000 - $60,000",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Full-time",
      company: "Design Co.",
      location: "San Francisco, CA",
      salary: "$90,000 - $110,000",
    },
    {
      id: 4,
      title: "Data Scientist",
      type: "Internship",
      company: "Data Wizards",
      location: "Chicago, IL",
      salary: "$70,000 - $90,000",
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter jobs based on search query
  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Apply Button Click
  const handleApply = (jobTitle) => {
    toast.success(`Applied for ${jobTitle}!`, {
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
    <div className="job-container">
      <h1 className="job-heading">Job Postings</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      {/* Job List */}
      <div className="job-list">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-content">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-type">{job.type}</p>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
              <p className="job-salary">{job.salary}</p>
            </div>
            <button
              className="apply-btn"
              onClick={() => handleApply(job.title)}
            >
              Apply
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

export default Job;