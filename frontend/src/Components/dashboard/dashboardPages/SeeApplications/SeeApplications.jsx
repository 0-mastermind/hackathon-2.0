import React from "react";
import "./SeeApplications.css"; // Import the CSS file

const SeeApplications = () => {
  // Sample applicants data
  const applicantsData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
    },
  ];

  return (
    <div className="see-applications-container">
      <h1 className="applications-heading">Applicants</h1>

      {/* Applicants Table */}
      <table className="applicants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
          </tr>
        </thead>
        <tbody>
          {applicantsData.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeApplications;