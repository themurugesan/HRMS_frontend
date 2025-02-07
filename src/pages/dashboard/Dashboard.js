import React, { useState, useEffect } from 'react';
import CardHeader from "../header/cardHeader";  
import axios from 'axios';  
import "./Dashboard.css";

export const Dashboard = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchImage();  
  }, []);

  // Fetch image and handle data
  const fetchImage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/dashimages`,
        {
          headers: { Authorization: localStorage.token }
        }
      );

      // Replace backslashes with forward slashes for image path
      data.image = data.image.replace(/\\/g, '/');
      setImage(data);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <>
      <CardHeader />
      <div className="app-container">
        <h1 className="heading">My Information</h1>

        {image ? (
          <div key={image._id} className="image-card">
            <h3>Personal Information</h3>
            
            
            <div className="info-row">
              <div className="info-col"><strong>Employee ID:</strong> {image.employeeId}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>First Name:</strong> {image.title}</div>
              <div className="info-col"><strong>Last Name:</strong> {image.description}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Middle Name:</strong> {image.middleName}</div>
              <div className="info-col"><strong>Email:</strong> {image.email}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Blood Group:</strong> {image.blood}</div>
              <div className="info-col"><strong>Date of Birth:</strong> {new Date(image.dateOfBirth).toLocaleDateString()}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Age:</strong> {image.age}</div>
              <div className="info-col"><strong>Gender:</strong> {image.gender}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Marital Status:</strong> {image.maritalStatus}</div>
              <div className="info-col"><strong>About Me:</strong> {image.aboutMe}</div>
            </div>

            <br />
            <h3>Contact Information</h3>
            <div className="info-row">
              <div className="info-col"><strong>UAN:</strong> {image.UAN}</div>
              <div className="info-col"><strong>PAN:</strong> {image.PAN}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Aadhaar:</strong> {image.Aadhaar}</div>
              <div className="info-col"><strong>Work Phone Number:</strong> {image.workPhoneNumber}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Extension:</strong> {image.extension}</div>
              <div className="info-col"><strong>Seating Location:</strong> {image.seatingLocation}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Personal Email Address:</strong> {image.personalEmailAddress}</div>
              <div className="info-col"><strong>Present Address:</strong> {image.presentAddress}</div>
            </div>

            <br />
            <h3>Employment Information</h3>
            <div className="info-row">
              <div className="info-col"><strong>Department:</strong> {image.department}</div>
              <div className="info-col"><strong>Location:</strong> {image.location}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Designation:</strong> {image.designation}</div>
              <div className="info-col"><strong>Employment Type:</strong> {image.employmentType}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Employee Status:</strong> {image.employeeStatus}</div>
              <div className="info-col"><strong>Source of Hire:</strong> {image.sourceOfHire}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Date of Joining:</strong> {new Date(image.dateOfJoining).toLocaleDateString()}</div>
              <div className="info-col"><strong>Date of Exit:</strong> {new Date(image.dateOfExit).toLocaleDateString()}</div>
            </div>

            <br />
            <h3>Experience</h3>
            <div className="info-row">
              <div className="info-col"><strong>Current Experience:</strong> {image.currentExperience}</div>
              <div className="info-col"><strong>Total Experience:</strong> {image.totalExperience}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Primary Reporting Manager:</strong> {image.primaryReportingManager}</div>
              <div className="info-col"><strong>Secondary Reporting Manager:</strong> {image.secondaryReportingManager}</div>
            </div>

            <br />
            <h3>Previous Employment</h3>
            <div className="info-row">
              <div className="info-col"><strong>Company Name:</strong> {image.companyName}</div>
              <div className="info-col"><strong>Job Title:</strong> {image.jobTitle}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>From Date:</strong> {new Date(image.fromDate).toLocaleDateString()}</div>
              <div className="info-col"><strong>To Date:</strong> {new Date(image.toDate).toLocaleDateString()}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Job Description:</strong> {image.jobDescription}</div>
            </div>

            <br />
            <h3>Education</h3>
            <div className="info-row">
              <div className="info-col"><strong>Institute Name:</strong> {image.instituteName}</div>
              <div className="info-col"><strong>Degree/Diploma:</strong> {image.degreeDiploma}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Specialization:</strong> {image.specialization}</div>
              <div className="info-col"><strong>Date of Completion:</strong> {new Date(image.dateOfCompletion).toLocaleDateString()}</div>
            </div>

            <br />
            <h3>Family Information</h3>
            <div className="info-row">
              <div className="info-col"><strong>Name of Parent:</strong> {image.nameOfParent}</div>
              <div className="info-col"><strong>Relationship:</strong> {image.relationship}</div>
            </div>
            <div className="info-row">
              <div className="info-col"><strong>Parent Date of Birth:</strong> {new Date(image.parentDateOfBirth).toLocaleDateString()}</div>
            </div>
          </div>
        ) : (
          <p>No information available.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
