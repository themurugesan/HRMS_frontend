import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardHeader from "./header/cardHeader";
import "../pages/cart/CardPage.css";
import "./LeavePolicy.css"

export const LeavePliocy = () => {
  const navigate = useNavigate();

  // State to hold the fetched policies
  const [policies, setPolicies] = useState([]);

  // Function to fetch policies from the backend
  const fetchPolicies = async () => {
    try {
      const token = localStorage.token;
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.origin}/api/policies`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Set the fetched policies in state
      setPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  // Fetch policies when the component mounts
  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <>
      <CardHeader />
      <div className="app-container">
        <h1 className="heading">Your Policies</h1>

        {/* Render policies */}
        <table className="policy-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Policy Type</th>
              <th>Duration Days</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {policies.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No policies available
                </td>
              </tr>
            ) : (
              policies.map((policy, index) => (
                <tr key={policy._id}>
                  <td>{index + 1}</td>
                  <td>{policy.policyType}</td>
                  <td>{policy.durationDays}</td>
                  <td>{policy.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeavePliocy;
