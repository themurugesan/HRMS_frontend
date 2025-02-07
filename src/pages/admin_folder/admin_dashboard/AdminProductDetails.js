import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./Admin_dashboard.css";
import Headers from "../../header/adminHeader";
import { Usercontext } from "../../../App";
import { useNavigate } from "react-router-dom";

const AdminProductDetails = () => {
  const { title, setTitle } = useContext(Usercontext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    title: title?.title || "",
    description: title?.description || "",
    amount: title?.amount || "",
    middleName: title?.middleName || "",
    email: title?.email || "",
    blood: title?.blood || "",
    department: title?.department || "",
    location: title?.location || "",
    designation: title?.designation || "",
    employmentType: title?.employmentType || "",
    employeeStatus: title?.employeeStatus || "",
    sourceOfHire: title?.sourceOfHire || "",
    dateOfJoining: title?.dateOfJoining || "",
    currentExperience: title?.currentExperience || "",
    totalExperience: title?.totalExperience || "",
    primaryReportingManager: title?.primaryReportingManager || "",
    secondaryReportingManager: title?.secondaryReportingManager || "",
    dateOfBirth: title?.dateOfBirth || "",
    age: title?.age || "",
    gender: title?.gender || "",
    maritalStatus: title?.maritalStatus || "",
    aboutMe: title?.aboutMe || "",
    UAN: title?.UAN || "",
    PAN: title?.PAN || "",
    Aadhaar: title?.Aadhaar || "",
    workPhoneNumber: title?.workPhoneNumber || "",
    extension: title?.extension || "",
    seatingLocation: title?.seatingLocation || "",
    personalEmailAddress: title?.personalEmailAddress || "",
    presentAddress: title?.presentAddress || "",
    dateOfExit: title?.dateOfExit || "",
    companyName: title?.companyName || "",
    jobTitle: title?.jobTitle || "",
    fromDate: title?.fromDate || "",
    toDate: title?.toDate || "",
    jobDescription: title?.jobDescription || "",
    instituteName: title?.instituteName || "",
    degreeDiploma: title?.degreeDiploma || "",
    specialization: title?.specialization || "",
    dateOfCompletion: title?.dateOfCompletion || "",
    nameOfParent: title?.nameOfParent || "",
    relationship: title?.relationship || "",
    parentDateOfBirth: title?.parentDateOfBirth || "",
    file: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);

  useEffect(() => {
    if (title && title._id) {
      setFormData({
        title: title.title,
        description: title.description,
        amount: title.employeeId,
        middleName: title.middleName,
        email: title.email,
        blood: title.blood,
        department: title.department,
        location: title.location,
        designation: title.designation,
        employmentType: title.employmentType,
        employeeStatus: title.employeeStatus,
        sourceOfHire: title.sourceOfHire,
        dateOfJoining: title.dateOfJoining,
        currentExperience: title.currentExperience,
        totalExperience: title.totalExperience,
        file: null,

        // New fields added here
        primaryReportingManager: title.primaryReportingManager || "",
        secondaryReportingManager: title.secondaryReportingManager || "",
        dateOfBirth: title.dateOfBirth || "",
        age: title.age || "",
        gender: title.gender || "",
        maritalStatus: title.maritalStatus || "",
        aboutMe: title.aboutMe || "",
        UAN: title.UAN || "",
        PAN: title.PAN || "",
        Aadhaar: title.Aadhaar || "",
        workPhoneNumber: title.workPhoneNumber || "",
        extension: title.extension || "",
        seatingLocation: title.seatingLocation || "",
        personalEmailAddress: title.personalEmailAddress || "",
        presentAddress: title.presentAddress || "",
        dateOfExit: title.dateOfExit || "",
        companyName: title.companyName || "",
        jobTitle: title.jobTitle || "",
        fromDate: title.fromDate || "",
        toDate: title.toDate || "",
        jobDescription: title.jobDescription || "",
        instituteName: title.instituteName || "",
        degreeDiploma: title.degreeDiploma || "",
        specialization: title.specialization || "",
        dateOfCompletion: title.dateOfCompletion || "",
        nameOfParent: title.nameOfParent || "",
        relationship: title.relationship || "",
        parentDateOfBirth: title.parentDateOfBirth || "",
      });

      setEditMode(true);
      setCurrentImageId(title._id);
    } else {
      setEditMode(false);
    }
  }, [title]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Form validation
    if (!formData.title || formData.title.length < 3) {
      alert("First Name must be at least 3 characters long.");
      return;
    }

    if (!formData.description || formData.description.length < 3) {
      alert(" must be at least 3 characters long.");
      return;
    }



    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      alert("Amount must be a valid number greater than zero.");
      return;
    }

    if (!formData.file && !editMode) {
      alert("Please select an image file.");
      return;
    }

    // Proceed with form submission if validation passes
    

    // Append the original fields
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("amount", formData.amount);
    data.append("middleName", formData.middleName);
    data.append("email", formData.email);
    data.append("blood", formData.blood);
    data.append("department", formData.department);
    data.append("location", formData.location);
    data.append("designation", formData.designation);
    data.append("employmentType", formData.employmentType);
    data.append("employeeStatus", formData.employeeStatus);
    data.append("sourceOfHire", formData.sourceOfHire);
    data.append("dateOfJoining", formData.dateOfJoining);
    data.append("currentExperience", formData.currentExperience);
    data.append("totalExperience", formData.totalExperience);

    // Append the new fields (including personal details, work details, and parent info)
    data.append("primaryReportingManager", formData.primaryReportingManager);
    data.append(
      "secondaryReportingManager",
      formData.secondaryReportingManager
    );
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("maritalStatus", formData.maritalStatus);
    data.append("aboutMe", formData.aboutMe);
    data.append("UAN", formData.UAN);
    data.append("PAN", formData.PAN);
    data.append("Aadhaar", formData.Aadhaar);
    data.append("workPhoneNumber", formData.workPhoneNumber);
    data.append("extension", formData.extension);
    data.append("seatingLocation", formData.seatingLocation);
    data.append("personalEmailAddress", formData.personalEmailAddress);
    data.append("presentAddress", formData.presentAddress);
    data.append("dateOfExit", formData.dateOfExit);
    data.append("companyName", formData.companyName);
    data.append("jobTitle", formData.jobTitle);
    data.append("fromDate", formData.fromDate);
    data.append("toDate", formData.toDate);
    data.append("jobDescription", formData.jobDescription);
    data.append("instituteName", formData.instituteName);
    data.append("degreeDiploma", formData.degreeDiploma);
    data.append("specialization", formData.specialization);
    data.append("dateOfCompletion", formData.dateOfCompletion);
    data.append("nameOfParent", formData.nameOfParent);
    data.append("relationship", formData.relationship);
    data.append("parentDateOfBirth", formData.parentDateOfBirth);

    // Append the image file if it's available
    if (formData.file) {
      data.append("image", formData.file);
    }

    try {
      if (editMode && currentImageId) {
        await axios.put(
          `${
            process.env.REACT_APP_SERVER
              ? process.env.REACT_APP_SERVER
              : window.location.origin
          }/api/images/${currentImageId}`,
          data
        );
      } else {
        await axios.post(
          `${
            process.env.REACT_APP_SERVER
              ? process.env.REACT_APP_SERVER
              : window.location.origin
          }/api/upload`,
          data
        );
      }

      // Reset form after successful upload
      // Reset form after successful upload
      setFormData({
        title: "",
        description: "",
        amount: "",
        middleName: "",
        email: "",
        blood: "",
        department: "",
        location: "",
        designation: "",
        employmentType: "",
        employeeStatus: "",
        sourceOfHire: "",
        dateOfJoining: "",
        currentExperience: "",
        totalExperience: "",
        primaryReportingManager: "",
        secondaryReportingManager: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        maritalStatus: "",
        aboutMe: "",
        UAN: "",
        PAN: "",
        Aadhaar: "",
        workPhoneNumber: "",
        extension: "",
        seatingLocation: "",
        personalEmailAddress: "",
        presentAddress: "",
        dateOfExit: "",
        companyName: "",
        jobTitle: "",
        fromDate: "",
        toDate: "",
        jobDescription: "",
        instituteName: "",
        degreeDiploma: "",
        specialization: "",
        dateOfCompletion: "",
        nameOfParent: "",
        relationship: "",
        parentDateOfBirth: "",
        file: null, // Reset the file input as well
      });

      // Reset the context title
      setTitle({ title: "", description: "", amount: "" });

      // Navigate back to dashboard
      navigate("/admindashboard");
    } catch (error) {
      alert("Error uploading image. Please try again.");
    }
  };
  const handleAttendanceClick = () => {
    navigate("/attendance"); // Navigate to the attendance page
  };

  return (
    <>
      <Headers />
      <div className="app-container">
        <h2 className="heading">
          {editMode ? "Employee Details" : "Add Employee"}
        </h2>
        <Button onClick={handleAttendanceClick} className="btn btn-secondary">
        Attendance
      </Button>

        <br/>  <br/>
          
        <form className="upload-form" onSubmit={handleUpload}>
        <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="amount">
                <Form.Label>Employee ID *</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="title">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="title"
                  pattern="[A-Za-z]+"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="description">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="description"
                  pattern="[A-Za-z]+"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="middleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Middle Name"
                  name="middleName"
                  pattern="[A-Za-z]+"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="blood">
                <Form.Label>Blood Group *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Blood Group"
                  name="blood"
                  value={formData.blood}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="department">
                <Form.Label>Department *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Department"
                  name="department"
                  pattern="[A-Za-z]+"

                  value={formData.department}
                  onChange={handleInputChange}
                  require
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  pattern="[A-Za-z]+"
                  readOnly
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Designation"
                  name="designation"
                  pattern="[A-Za-z]+"
                  readOnly
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="employmentType">
                <Form.Label>Employment Type *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Employment Type"
                  name="employmentType"
                  pattern="[A-Za-z]+"
                  readOnly
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  required

                />

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="employeeStatus">
                <Form.Label>Employee Status *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Employee Status"
                  name="employeeStatus"
                  pattern="[A-Za-z]+"
                  readOnly
                  value={formData.employeeStatus}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="sourceOfHire">
                <Form.Label>Source of Hire</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Source of Hire"
                  name="sourceOfHire"
                  pattern="[A-Za-z]+"
                  readOnly
                  value={formData.sourceOfHire}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="dateOfJoining">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfJoining"
                  readOnly
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="currentExperience">
                <Form.Label>Current Experience (in years)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Current Experience"
                  name="currentExperience"
                  readOnly
                  value={formData.currentExperience}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="totalExperience">
                <Form.Label>Total Experience (in years)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Total Experience"
                  name="totalExperience"
                  readOnly
                  value={formData.totalExperience}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          

          {/* //new */}

         
          <br/>  <br/>

          {/* New form fields */}
          
          <h3><center>hierarchy information</center></h3>
          <Row>
            <Col md={6}>
              <Form.Group
                className="form-group"
                controlId="primaryReportingManager"
              >
                <Form.Label>Primary Reporting Manager *</Form.Label>
                <Form.Control
                  type="text"
                  name="primaryReportingManager"
                  pattern="[A-Za-z]+"
                  readOnly

                  value={formData.primaryReportingManager}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group
                className="form-group"
                controlId="secondaryReportingManager"
              >
                <Form.Label>Secondary Reporting Manager</Form.Label>
                <Form.Control
                  type="text"
                  name="secondaryReportingManager"
                  pattern="[A-Za-z]+"
                  readOnly

                  value={formData.secondaryReportingManager}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br/>  <br/>

          <h3><center>Personal Information</center></h3>


          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="dateOfBirth">
                <Form.Label>Date of Birth *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="age">
                <Form.Label>Age *</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  readOnly

                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="gender">
                <Form.Label>Gender *</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  pattern="[A-Za-z]+"
                  readOnly

                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="maritalStatus">
                <Form.Label>Marital Status *</Form.Label>
                <Form.Control
                  type="text"
                  name="maritalStatus"
                  pattern="[A-Za-z]+"
                  readOnly

                  required
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="aboutMe">
                <Form.Label>About Me</Form.Label>
                <Form.Control
                  as="textarea"
                  readOnly
                  rows={3}
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Additional fields */}
          <br/>  <br/>

          <h3><center>Identify Information</center></h3>
          
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="UAN">
                <Form.Label>UAN *</Form.Label>
                <Form.Control
                  type="text"
                  name="UAN"
                  readOnly
                  required
                  value={formData.UAN}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="PAN">
                <Form.Label>PAN *</Form.Label>
                <Form.Control
                  type="text"
                  name="PAN"
                  readOnly
                  required
                  value={formData.PAN}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="Aadhaar">
                <Form.Label>Aadhaar *</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  name="Aadhaar"
                  required
                  value={formData.Aadhaar}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="workPhoneNumber">
                <Form.Label>Work Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  readOnly
                  name="workPhoneNumber"
                  value={formData.workPhoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="extension">
                <Form.Label>Extension</Form.Label>
                <Form.Control
                  type="text"
                  name="extension"
                  readOnly
                  value={formData.extension}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="seatingLocation">
                <Form.Label>Seating Location</Form.Label>
                <Form.Control
                  type="number"
                  name="seatingLocation"
                  readOnly
                  value={formData.seatingLocation}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group
                className="form-group"
                controlId="personalEmailAddress"
              >
                <Form.Label>Personal Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="personalEmailAddress"
                  readOnly
                  value={formData.personalEmailAddress}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="presentAddress">
                <Form.Label>Present Address *</Form.Label>
                <Form.Control
                  type="text"
                  name="presentAddress"
                  required
                  pattern="[A-Za-z]+"
                  readOnly

                  value={formData.presentAddress}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Date of Exit */}
          <br/>  <br/>

<h3><center>  Separation Information:</center></h3>
        
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="dateOfExit">
                <Form.Label>Date of Exit</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfExit"
                  readOnly
                  value={formData.dateOfExit}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Job-related fields */}
          <br/>  <br/>

<h3><center> Work Experience</center></h3>
        
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  pattern="[A-Za-z]+"
                  readOnly

                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="jobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  pattern="[A-Za-z]+"
                  readOnly

                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="fromDate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  readOnly
                  value={formData.fromDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="toDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  readOnly
                  value={formData.toDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="form-group" controlId="jobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="jobDescription"
                  pattern="[A-Za-z]+"
                  readOnly

                  value={formData.jobDescription}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
            

          {/* Education details */}
          <br/>  <br/>

<h3><center>  Eduction Details</center></h3>
         
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="instituteName">
                <Form.Label>Institute Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  pattern="[A-Za-z]+"
                  readOnly
                  required
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="degreeDiploma">
                <Form.Label>Degree/Diploma *</Form.Label>
                <Form.Control
                  type="text"
                  name="degreeDiploma"
                  pattern="[A-Za-z]+"
                  readOnly
                  required
                  value={formData.degreeDiploma}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="specialization">
                <Form.Label>Specialization *</Form.Label>
                <Form.Control
                  type="text"
                  name="specialization"
                  pattern="[A-Za-z]+"
                  readOnly
                  required
                  value={formData.specialization}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="dateOfCompletion">
                <Form.Label>Date of Completion *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfCompletion"
                  required
                  readOnly
                  value={formData.dateOfCompletion}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Parent Details */}
          <br/>  <br/>

<h3><center>Dependent Details</center></h3>
          
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="nameOfParent">
                <Form.Label>Name of Parent *</Form.Label>
                <Form.Control
                  type="text"
                  name="nameOfParent"
                  pattern="[A-Za-z]+"
                  required
                  readOnly
                  value={formData.nameOfParent}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="form-group" controlId="relationship">
                <Form.Label>Relationship *</Form.Label>
                <Form.Control
                  type="text"
                  name="relationship"
                  pattern="[A-Za-z]+"
                  required
                  readOnly
                  value={formData.relationship}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="parentDateOfBirth">
                <Form.Label>Parent's Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  readOnly
                  name="parentDateOfBirth"
                  value={formData.parentDateOfBirth}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br/>
          <br/>

          
          <br />
          <br />
          <br />
        </form>
      </div>
    </>
  );
};

export default AdminProductDetails;
