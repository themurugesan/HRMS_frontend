import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Headers from "../../header/adminHeader";
import { Usercontext } from "../../../App";
import { useNavigate } from "react-router-dom";

const PolicyAdd = () => {
  const { title, setTitle } = useContext(Usercontext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    policyType: title?.policyType || "",
    durationDays: title?.durationDays || "",
    duration: title?.duration || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);

  useEffect(() => {
    if (title && title._id) {
      setFormData({
        policyType: title.policyType,
        durationDays: title.durationDays,
        duration: title.duration,
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

  const handleUpload = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!formData.policyType || formData.policyType.length < 3) {
      alert("Policy Type must be at least 3 characters long.");
      return;
    }
  
    if (!formData.durationDays || isNaN(formData.durationDays) || formData.durationDays <= 0) {
      alert("Duration (Days) must be a valid number greater than zero.");
      return;
    }
  
    if (!formData.duration || formData.duration.length < 3) {
      alert("Duration must be at least 3 characters long.");
      return;
    }
  
    // Proceed with form submission if validation passes
    const data = {
      policyType: formData.policyType,
      durationDays: formData.durationDays,
      duration: formData.duration,
    };
  
    try {
      if (editMode && currentImageId) {
        // Update existing policy
        await axios.put(
          `${
            process.env.REACT_APP_SERVER
              ? process.env.REACT_APP_SERVER
              : window.location.origin
          }/api/policyupdate/${currentImageId}`,
          data // Send as JSON
        );
      } else {
        // Add new policy
        await axios.post(
          `${
            process.env.REACT_APP_SERVER
              ? process.env.REACT_APP_SERVER
              : window.location.origin
          }/api/policyadd`,
          data // Send as JSON
        );
      }
  
      // Reset form after successful upload
      setFormData({
        policyType: "",
        durationDays: "",
        duration: "",
      });
  
      // Reset the context title
      setTitle({ policyType: "", durationDays: "", duration: "" });
  
      // Navigate back to dashboard
      navigate("/leavepolicy");
    } catch (error) {
      alert("Error uploading policy. Please try again.");
    }
  };
  

  return (
    <>
      <Headers />
      <Container className="app-container">
        <h1 className="heading">
          {editMode ? "Edit Policy" : "Add Policy"}
        </h1>
        <br/>
        <br/>
        <h3>Policy Details</h3>
        <Form className="upload-form" onSubmit={handleUpload}>
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="policyType">
                <Form.Label>Policy Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Policy Type"
                  name="policyType"
                  value={formData.policyType}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group" controlId="durationDays">
                <Form.Label>Duration (Days)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Duration (Days)"
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="form-group" controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="submit-btn">
            {editMode ? "Update Policy" : "Add Policy"}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default PolicyAdd;
